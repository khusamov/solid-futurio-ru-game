import {factory, SyntaxKind, TypeNode, PropertySignature} from 'typescript';

/**
 * get param1(): string { return this.universalObject.getValue<string>('param1'); }
 */
export default function createGetAccessorDeclaration(propertySignature: PropertySignature) {
	const name = propertySignature.name.getText()
	const type = propertySignature.type
	return factory.createGetAccessorDeclaration(
		[],
		[],
		name,
		[],
		type,
		factory.createBlock([
			factory.createReturnStatement(
				factory.createCallExpression(
					factory.createPropertyAccessExpression(
						factory.createPropertyAccessExpression(
							factory.createThis(),
							'universalObject'
						),
						'getValue'
					),
					type ? [type] : [],
					[factory.createStringLiteral(name, true)]
				)
			)
		])
	)
}