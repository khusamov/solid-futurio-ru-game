import {factory, SyntaxKind} from 'typescript';

factory.createJSDocComment('Комментарий к классу')
// Куда добавлять этот узел?

/**
 * constructor(private universalObject: UniversalObject) { }
 */
export default function createConstructorDeclaration() {
	return factory.createConstructorDeclaration(
		[],
		[],
		[
			factory.createParameterDeclaration(
				[], [factory.createModifier(SyntaxKind.PrivateKeyword)],
				undefined, 'universalObject', undefined,
				factory.createTypeReferenceNode('IUniversalObject')
			)
		],
		factory.createBlock([])
	)
}

export function createConstructorImportDeclaration() {
	return [
		factory.createImportDeclaration(
			undefined,
			undefined,
			factory.createImportClause(false, factory.createIdentifier('IUniversalObject'), undefined),
			factory.createStringLiteral('khusamov-base-types')
		)
	]
}