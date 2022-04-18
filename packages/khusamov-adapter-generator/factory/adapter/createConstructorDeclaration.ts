import {factory, SyntaxKind} from 'typescript';

factory.createJSDocComment('fsdfdsf')

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
				factory.createTypeReferenceNode('UniversalObject')
			)
		],
		factory.createBlock([])
	)
}


/// export type HasJSDoc = ParameterDeclaration | CallSignatureDeclaration | ClassStaticBlockDeclaration | ConstructSignatureDeclaration |
// MethodSignature | PropertySignature | ArrowFunction | ParenthesizedExpression | SpreadAssignment | ShorthandPropertyAssignment |
// PropertyAssignment | FunctionExpression | EmptyStatement | DebuggerStatement | Block | VariableStatement | ExpressionStatement |
// IfStatement | DoStatement | WhileStatement | ForStatement | ForInStatement | ForOfStatement | BreakStatement | ContinueStatement |
// ReturnStatement | WithStatement | SwitchStatement | LabeledStatement | ThrowStatement | TryStatement | FunctionDeclaration |
// ConstructorDeclaration | MethodDeclaration | VariableDeclaration | PropertyDeclaration | AccessorDeclaration | ClassLikeDeclaration |
// InterfaceDeclaration | TypeAliasDeclaration | EnumMember | EnumDeclaration | ModuleDeclaration | ImportEqualsDeclaration | ImportDeclaration |
// NamespaceExportDeclaration | ExportAssignment | IndexSignatureDeclaration | FunctionTypeNode | ConstructorTypeNode | JSDocFunctionType |
// ExportDeclaration | NamedTupleMember | ExportSpecifier | EndOfFileToken;
//