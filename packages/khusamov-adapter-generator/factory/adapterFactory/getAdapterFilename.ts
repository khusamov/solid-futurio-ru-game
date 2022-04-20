import {InterfaceDeclaration} from 'typescript';
import {join, parse} from 'path';

export default function getAdapterFilename(interfaceDeclaration: InterfaceDeclaration) {
	const fileName = interfaceDeclaration.getSourceFile().fileName
	const {dir, name, ext} = parse(fileName)
	return join(dir, name.slice(1) + 'Adapter' + ext)
}