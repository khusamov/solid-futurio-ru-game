import {factory, SyntaxKind, InterfaceDeclaration, ClassElement, Statement} from 'typescript';
import createConstructorDeclaration from './createConstructorDeclaration';

/**
 * export default class MovableAdapter implements IMovable { }
 */
export default function createClassDeclaration(interfaceDeclaration: InterfaceDeclaration, members: readonly ClassElement[]) {
	const className = interfaceDeclaration.name.text.slice(1) + 'Adapter'
	return factory.createClassDeclaration(
		[],
		[
			factory.createModifier(SyntaxKind.ExportKeyword),
			factory.createModifier(SyntaxKind.DefaultKeyword)
		],
		className,
		[],
		[
			factory.createHeritageClause(
				SyntaxKind.ImplementsKeyword,
				[
					factory.createExpressionWithTypeArguments(
						factory.createIdentifier(interfaceDeclaration.name.text),
						undefined
					)
				]
			)
		],
		[
			createConstructorDeclaration(),
			...members
		]
	)
}