import type * as ts from 'typescript';
import type { TransformerExtras, PluginConfig } from 'ts-patch';

import { createParser, createFormatter, SchemaGenerator } from 'ts-json-schema-generator';

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
				// see instead how we can access the parser part of the package directly
				// https://github.com/vega/ts-json-schema-generator/blob/next/factory/generator.ts

				for (const declaration of node.declarationList.declarations) {
					if (ts.isIdentifier(declaration.name)) {
						const variableName = declaration.name.text;
						const typeNode = declaration.type;
						if (typeNode) {
							console.log(`---------------------------------`);

							console.log(`Exporting Variable: ${variableName}`);
							console.log(typeNode.getText());
							const config = {};
							const parser = createParser(program as any, config);

							const formatter = createFormatter(config);

							const generator = new SchemaGenerator(program as any, parser, formatter, config);
							try {
								const jsonSchema = generator.createSchema(typeNode.getText());

								console.log(variableName, JSON.stringify(jsonSchema, null, 2));
							} catch (e) {
								console.warn(variableName, e.message);
							}
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
