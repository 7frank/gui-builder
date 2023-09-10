import type * as ts from 'typescript';
import type { TransformerExtras, PluginConfig } from 'ts-patch';

import { createGenerator, Settings, createParser } from 'ts-json-schema-generator';

/** Changes string literal 'before' to 'after' */
export default function transformer(
	program: ts.Program,
	pluginConfig: PluginConfig,
	{ ts }: TransformerExtras
) {
	return (ctx: ts.TransformationContext) => {
		const { factory } = ctx;

		function extractExportedVariables(node: ts.Node): ts.Node {
			if (
				ts.isVariableStatement(node) &&
				node.modifiers &&
				node.modifiers.some((modifier) => modifier.kind === ts.SyntaxKind.ExportKeyword)
			) {
				for (const declaration of node.declarationList.declarations) {
					if (ts.isIdentifier(declaration.name)) {
						const variableName = declaration.name.text;
						const typeNode = declaration.type;
						if (typeNode) {
							const generator = createGenerator({
								tsconfig: '../tsconfig.json', // Replace with your tsconfig.json path
								type: variableName,
								topRef: true
							});
							const jsonSchema = generator.createSchema(typeNode.getText());
							console.log(
								`Exported Variable: ${variableName}, JSON Schema: ${JSON.stringify(
									jsonSchema,
									null,
									2
								)}`
							);
						}
					}
				}
			}

			return ts.visitEachChild(node, extractExportedVariables, ctx);
		}

		return (sourceFile: ts.SourceFile) => {
			// we only want to parse svelte files for relevant data
			if (!sourceFile.fileName.endsWith('.svelte')) return sourceFile;
			const result = ts.visitNode(sourceFile, extractExportedVariables);
			return result;
		};
	};
}
