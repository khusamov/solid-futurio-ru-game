import {factory, PropertySignature} from 'typescript';
import cloneTypeNode from './cloneTypeNode';

/**
 * set param1(value: string) { this.universalObject.setValue<string>('param1', value); }
 */
export default function createSetAccessorDeclaration(propertySignature: PropertySignature) {
	const name = propertySignature.name.getText()
	const type = propertySignature.type ? cloneTypeNode(propertySignature.type) : propertySignature.type
	const valueIdentifier = factory.createIdentifier('value')
	return factory.createSetAccessorDeclaration(
		[],
		[],
		name,
		[factory.createParameterDeclaration([], [], undefined, valueIdentifier, undefined, type)],
		factory.createBlock([
			factory.createReturnStatement(
				factory.createCallExpression(
					factory.createPropertyAccessExpression(
						factory.createPropertyAccessExpression(
							factory.createThis(),
							'universalObject'
						),
						'setValue'
					),
					type ? [type] : [],
					[
						factory.createStringLiteral(name, true),
						valueIdentifier
					]
				)
			)
		])
	)
}