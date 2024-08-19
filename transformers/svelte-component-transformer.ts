import type * as ts from 'typescript';
import type { TransformerExtras, PluginConfig } from 'ts-patch';
import path from 'path';
import camelCase from 'lodash.camelcase';
import { createParser, createFormatter, SchemaGenerator } from 'ts-json-schema-generator';
import {
	createGrapesType,
	createPluginsImportFile,
	writeComponentToFileSystem
} from './createGrapesjsTemplate';
import { extractJsonSchema } from './extractJsonSchema';

/**
 * Note: currently this is used to create a file (.generated/plugin.ts) that is incrementally getting bigger.. quite redundant but for now serves its purpose
 */
const typesRecord: Record<string, true> = {};

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

		const props: string[] = [];

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

						props.push(variableName);

						const symbol = checker.getSymbolAtLocation(declaration.name);

						if (symbol) {
							/**
							 * using only primitives and non - complex types for now
							 */
							const foo = serializeSymbol(symbol);
							console.log('serialized primitives', foo);
						}
					}
				}
			}

			return ts.visitEachChild(node, extractExportedVariables, ctx);
		}

		return (sourceFile: ts.SourceFile) => {
			// we only want to parse svelte files for relevant data
			if (!sourceFile.fileName.endsWith('.svelte')) return sourceFile;

			// for now we only allow files that are in a components folder
			if (!sourceFile.fileName.includes('/components/')) return sourceFile;

			const jsonSchema=extractJsonSchema(program,sourceFile)
			console.log("jsonSchema",jsonSchema)


			console.log(sourceFile.fileName);
			const result = ts.visitNode(sourceFile, extractExportedVariables);
			const str = createGrapesType({ fileName: sourceFile.fileName, traits: props });

			writeComponentToFileSystem(str, sourceFile.fileName);

			const f = path.basename(sourceFile.fileName, '.svelte');

			const camel = camelCase(f);
			typesRecord[camel] = true;

			createPluginsImportFile(Object.keys(typesRecord));

			return result;
		};
	};
}
