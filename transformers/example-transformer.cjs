/** Changes string literal 'before' to 'after' */
module.exports = function transformer(program, pluginConfig, { ts: tsInstance }) {
	return (ctx) => {
		const { factory } = ctx;
		return (sourceFile) => {
			function visit(node) {
				if (tsInstance.isStringLiteral(node) && node.text === 'plugin-test-before') {
					console.log('afterstuff', sourceFile.fileName, node.kind);
					return factory.createStringLiteral('after');
				}
				return tsInstance.visitEachChild(node, visit, ctx);
			}
			return tsInstance.visitNode(sourceFile, visit);
		};
	};
};
//# sourceMappingURL=example-transformer.js.map
