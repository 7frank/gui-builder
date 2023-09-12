import fs from 'fs';
import path from 'path';
import kebabCase from 'lodash.kebabcase';
import camelCase from 'lodash.camelcase';
export function getRelativeImportPath(output: string, absolutePathToFile: string) {
	const relativeImportPath = path.relative(
		path.resolve(process.cwd(), output),
		path.resolve(process.cwd(), absolutePathToFile)
	);

	const arr = relativeImportPath.split('/');
	arr.shift();
	return arr.join('/');
}

export function createGrapesType({
	fileName,
	traits = []
}: {
	fileName: string;
	traits?: string[];
}) {
	const importPath = getRelativeImportPath('', fileName);

	const f = path.basename(fileName, '.svelte');
	const kebab = kebabCase(f);
	const camel = camelCase(f);
	return `import type { AddComponentTypeOptions } from 'grapesjs';
import _Component from '../src/${importPath}';

export const ${camel}Type: AddComponentTypeOptions = {
	model: {
		defaults: {
			traits:[
				${traits.map((it) => `'${it}'`).join(',')}
			]
		},
		handleTypeChange(traitName:string) {

			const newValue=this.getAttributes()[traitName]
			

			const sv=(this.view as any)?.mySvelteComponent
			console.log(sv,"trait", traitName, "changed to:", newValue);
			if (sv) sv[traitName]=newValue
		},

		init() {
			${traits
				.map((it) => `this.on('change:attributes:${it}', ()=>this.handleTypeChange('${it}'));`)
				.join(';')}
		},
	},
	view: {
		init() {
			this.renderSvelteComponent();
		},
		renderSvelteComponent() {
			// Render the Svelte component within the custom component's view
			setTimeout(() => {

				const t=this.model.get('traits')
				
				${traits
					.map((it) => `const ${it} = t?t.where({name: '${it}'})[0].get('value'):undefined;`)
					.join(';')}

				this.mySvelteComponent = new _Component({
					target: this.el,
					props: {
						${traits.map((it) => `${it}`).join(',')}
					}	
				});
				setTimeout(() => {
					this.svelteElement = this.el.querySelector(':first-child');
				}, 1);
			}, 1);
		},
		onRender() {
			if (this.svelteElement) this.el.appendChild(this.svelteElement);
		},
		remove() {
			this.mySvelteComponent?.$destroy();
			return this;
		}
	}
};`;
}

export function writeComponentToFileSystem(content: string, fileName: string) {
	const outDir = path.resolve(process.cwd(), '.generated');

	if (!fs.existsSync(outDir)) {
		fs.mkdirSync(outDir);
	}

	const f = path.basename(fileName, '.svelte');

	const camel = camelCase(f);

	const outFile = path.resolve(outDir, camel + '.ts');

	fs.writeFileSync(outFile, content, 'utf8');
}

export function createPluginsImportFile(types: string[]) {
	const tpl = `

	import type { Editor } from 'grapesjs';

 ${types.map((n) => `import { ${n}Type } from './${n}';`).join('\n')}

export const svelteGrapesComponentsPlugin = (editor: Editor) => {

	${types
		.map(
			(n) => `
	editor.DomComponents.addType('x-${n}', ${n}Type);

	editor.Blocks.add('x-${n}-block', {
		category: 'svelte',
		label: 'x-${n}',
		attributes: {
			//class: 'fa fa-text'
		},
		content: { type: 'x-${n}' }
	});
	`
		)
		.join('\n\n')}


	
};

	`;

	const outDir = path.resolve(process.cwd(), '.generated');

	if (!fs.existsSync(outDir)) {
		fs.mkdirSync(outDir);
	}

	const outFile = path.resolve(outDir, 'plugin.ts');

	fs.writeFileSync(outFile, tpl, 'utf8');
}
