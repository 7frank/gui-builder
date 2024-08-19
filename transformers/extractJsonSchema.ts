import { resolve } from 'path';
import * as ts from 'typescript';

import * as TJS from 'typescript-json-schema';

// optionally pass argument to schema generator
const settings: TJS.PartialArgs = {
	required: true, 
};

/**
 * 
 * @deprecated
 * FIXME currently does not do much "Cannot find global type"
 */
export function extractJsonSchema(program: ts.Program, sourceFile: ts.SourceFile) {
	const schema = TJS.generateSchema(program, 'MyType', settings);

	// // ... or a generator that lets us incrementally get more schemas

	const generator = TJS.buildGenerator(program, settings);

  if (!generator) console.warn("no generator !!")
	if (generator) {
		// generator can be also reused to speed up generating the schema if usecase allows:
		const schemaWithReusedGenerator = TJS.generateSchema(
			program,
			'MyType',
			settings,
			[],
			generator
		);

		// all symbols
		const symbols = generator.getUserSymbols();

		// Get symbols for different types from generator.
		generator.getSchemaForSymbol('MyType');
		generator.getSchemaForSymbol('AnotherType');

		console.log({ schemaWithReusedGenerator });
		console.log({ symbols });
	}
	return schema;
}

export function createProgramFromSourceFile(
	sourceFile: ts.SourceFile,
	compilerOptions: ts.CompilerOptions = {}
): ts.Program {
	// Create a minimal custom compiler host
	const compilerHost: ts.CompilerHost = {
		getSourceFile: (fileName, languageVersion) =>
			fileName === sourceFile.fileName ? sourceFile : undefined,
		getDefaultLibFileName: () => 'lib.d.ts',
		writeFile: () => {},
		getCurrentDirectory: () => '',
		getDirectories: () => [],
		fileExists: (fileName) => fileName === sourceFile.fileName,
		readFile: () => sourceFile.getFullText(),
		getCanonicalFileName: (fileName) => fileName,
		useCaseSensitiveFileNames: () => true,
		getNewLine: () => '\n'
	};

	// Create a program using the in-memory source file
	const program = ts.createProgram([sourceFile.fileName], compilerOptions, compilerHost);

	return program;
}
