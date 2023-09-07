import ts from 'typescript';
/** Changes string literal 'before' to 'after' */
export default function transformer(program: ts.Program): ts.TransformerFactory<ts.SourceFile> {
	const visitor = (node: ts.Node) => visitNode(node, program);
	return (context) => (source) => ts.visitEachChild(source, visitor, context);
}

function visitNode(node: ts.Node, program: ts.Program): ts.Node[] | ts.Node {
	// if (ts.isExportAssignment(node) && !node.isExportEquals && ts.isArrowFunction(node.expression)) {
	//   return nameExportedArrowFunction(node, deriveUniqueName(node, program))
	// }
	// if (ts.isFunctionDeclaration(node) && !node.name && isExportDefault(node)) {
	//   return updateFunctionDeclarationName(node, deriveUniqueName(node, program))
	// }
	// if (ts.isClassDeclaration(node) && !node.name && isExportDefault(node)) {
	//   return updateClassDeclarationName(node, deriveUniqueName(node, program, true))
	// }

	console.log(node.kind);
	return node;
}
