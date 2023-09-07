import type * as ts from 'typescript';
import type { TransformerExtras, PluginConfig } from 'ts-patch';

/** Changes string literal 'before' to 'after' */
export default function (
	program: ts.Program,
	pluginConfig: PluginConfig,
	{ ts: tsInstance }: TransformerExtras
) {
	return (ctx: ts.TransformationContext) => {
		const { factory } = ctx;

		return (sourceFile: ts.SourceFile) => {
			function visit(node: ts.Node): ts.Node {
				if (tsInstance.isStringLiteral(node) && node.text === 'before') {
					return factory.createStringLiteral('after');
				}
				return tsInstance.visitEachChild(node, visit, ctx);
			}
			return tsInstance.visitNode(sourceFile, visit);
		};
	};
}
