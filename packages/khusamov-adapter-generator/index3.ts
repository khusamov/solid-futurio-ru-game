import {resolve} from 'path'
import {
	getJSDocTags,
	isPropertySignature,
	SyntaxKind,
	TypeNode,
	TypeReferenceNode,
	isTypeReferenceNode,
	resolveTypeReferenceDirective,
	factory, NodeFlags, createPrinter, EmitHint, Statement
} from 'typescript'
import getProgram from './functions/getProgram';
import getInterfaceDeclarations from './functions/getInterfaceDeclarations';
import createClassDeclaration from './factory/adapter/createClassDeclaration';
import createGetAccessorDeclaration from './factory/adapter/createGetAccessorDeclaration';

// Задача: получить из проекта все интерфейсы.
// Далее получить из каждого интерфейса информацию:
// - JSDoc-теги
// - поля (имя, тип, модификаторы)
// - методы (имя, параметры с типам, выходной тип, модификаторы)
// - путь к файлу


const projectPath = resolve('../../', 'packages/khusamov-game-command-system')
const program = getProgram(projectPath, 'src/index.ts')
const projectSourceFiles = program.getSourceFiles().filter(sourceFile => sourceFile.fileName.startsWith(projectPath))
const foundInterfaceDeclarations = getInterfaceDeclarations(projectSourceFiles)

for (const interfaceDeclaration of foundInterfaceDeclarations) {
	const propertySignatures = interfaceDeclaration.members.filter(isPropertySignature)
	console.log('Интерфейс:', interfaceDeclaration.name.text)
	console.log('Файл:', interfaceDeclaration.getSourceFile().fileName.replace(projectPath, ''))
	console.log('Теги:', getJSDocTags(interfaceDeclaration).map(tag => tag.tagName.text))
	console.log('Свойства:', propertySignatures.map(prop => [prop.name.getText(), getTypeInfo(prop.type)]))
	console.log('- - - - - - - - - - - - - - - - - - - - - - - - -')
}

function getTypeInfo(type?: TypeNode): string {
	if (!type) return 'Тип не указан'
	switch (type.kind) {
		case SyntaxKind.NumberKeyword: return type.getText()
		case SyntaxKind.TypeReference: return String((type as TypeReferenceNode).typeName.getText())
		default: return String(type.kind)
	}
}









const statements: Statement[] = []
for (const interfaceDeclaration of foundInterfaceDeclarations) {
	const isAdaptable: boolean = !!getJSDocTags(interfaceDeclaration).find(tag => tag.tagName.text === 'adaptable')
	if (isAdaptable) {
		const propertySignatures = interfaceDeclaration.members.filter(isPropertySignature)
		statements.push(
			createClassDeclaration(
				interfaceDeclaration,
				propertySignatures.map(propertySignature => createGetAccessorDeclaration(propertySignature))
			)
		)
	}
}

const movableAdapterSourceFile = factory.createSourceFile(
	statements,
	factory.createToken(SyntaxKind.EndOfFileToken),
	NodeFlags.None
)

console.log(
	createPrinter()
		.printNode(
			EmitHint.Unspecified,
			movableAdapterSourceFile,
			movableAdapterSourceFile
		)
)