/** Changes string literal 'before' to 'after' */
module.exports = function transformer(program, pluginConfig, { ts }) {
	const visitor = (node) => visitNode(node, program);
	return (context) => (source) => ts.visitEachChild(source, visitor, context);
};

function visitNode(node, program) {
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
