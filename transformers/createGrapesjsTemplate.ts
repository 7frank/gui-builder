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

export function createGrapesType({ fileName }: { fileName: string }) {
	const importPath = getRelativeImportPath('', fileName);

	const f = path.basename(fileName, '.svelte');
	const kebab = kebabCase(f);
	const camel = camelCase(f);
	return `import type { AddComponentTypeOptions } from 'grapesjs';
import _Component from '${importPath}';

export const mySvelteImageType: AddComponentTypeOptions = {
	model: {
		defaults: {}
	},
	view: {
		init() {
			this.renderSvelteComponent();
		},
		renderSvelteComponent() {
			// Render the Svelte component within the custom component's view
			setTimeout(() => {
				this.mySvelteComponent = new _Component({
					target: this.el
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

export function writeToFileSystem(content: string, fileName: string) {
	const outDir = path.resolve(process.cwd(), '.generated');

	if (!fs.existsSync(outDir)) {
		fs.mkdirSync(outDir);
	}

	const f = path.basename(fileName, '.svelte');

	const camel = camelCase(f);

	const outFile = path.resolve(outDir, camel);

	fs.writeFileSync(outFile, content, 'utf8');
}
