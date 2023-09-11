import type * as ts from 'typescript';
import type { TransformerExtras, PluginConfig } from 'ts-patch';

import { createParser, createFormatter, SchemaGenerator } from 'ts-json-schema-generator';
import {
	createGrapesType,
	createPluginsImportFile,
	writeComponentToFileSystem
} from './createGrapesjsTemplate';

/** Changes string literal 'before' to 'after' */
export default function transformer(
	program: ts.Program,
	pluginConfig: PluginConfig,
	{ ts }: TransformerExtras
) {
	const checker = program.getTypeChecker();

	/** Serialize a symbol into a json object */
	function serializeSymbol(symbol: ts.Symbol) {
		return {
			name: symbol.getName(),
			documentation: ts.displayPartsToString(symbol.getDocumentationComment(checker)),
			type: checker.typeToString(
				checker.getTypeOfSymbolAtLocation(symbol, symbol.valueDeclaration!)
				// checker.getTypeAtLocation(symbol.valueDeclaration!)
			)
		};
	}

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
						console.log('variableName', variableName);

						const symbol = checker.getSymbolAtLocation(declaration.name);

						if (symbol) {
							/**
							 * using only primitives and non - complex types for now
							 */
							const foo = serializeSymbol(symbol);
							console.log(foo);

							/**
							 * shared code for example 2 and 3
							 */
							// const typeNode = declaration.type;

							// if (!typeNode) {
							// 	console.warn(variableName, 'no type node from type');
							// 	continue;
							// }

							/**
							 * potentially doing something with type and type nodes
							 */
							//const type = checker.getTypeOfSymbolAtLocation(symbol, symbol.valueDeclaration!);

							// const typeNode = checker.typeToTypeNode(
							// 	type,
							// 	node,
							// 	ts.NodeBuilderFlags.NoTruncation | ts.NodeBuilderFlags.InTypeAlias
							// ); // declaration.type;

							// console.log({ typeNode });
							// const typeAsJson = typeNode.getText();
							// console.log(typeAsJson);

							/**
							 * ts-json-schema-generator
							 */
							// const config = {};
							// const parser = createParser(program as any, config);

							// const formatter = createFormatter(config);

							// const generator = new SchemaGenerator(program as any, parser, formatter, config);
							// try {
							// 	// const jsonSchema = generator.createSchemaFromNodes([typeNode as any]);

							// 	const jsonSchema = generator.createSchema(typeNode.getText());

							// 	console.log(variableName, JSON.stringify(jsonSchema, null, 2));
							// } catch (e) {
							// 	console.warn(variableName, e.message);
							// }
						}
					}
				}
			}

			return ts.visitEachChild(node, extractExportedVariables, ctx);
		}

		return (sourceFile: ts.SourceFile) => {
			// we only want to parse svelte files for relevant data
			if (!sourceFile.fileName.endsWith('.svelte')) return sourceFile;

			console.log(sourceFile.fileName);
			const result = ts.visitNode(sourceFile, extractExportedVariables);

			const str = createGrapesType({ fileName: sourceFile.fileName });

			writeComponentToFileSystem(str, sourceFile.fileName);

			createPluginsImportFile();

			return result;
		};
	};
}
