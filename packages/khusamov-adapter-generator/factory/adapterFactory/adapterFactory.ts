import createClassDeclaration from './createClassDeclaration';
import createConstructorDeclaration from './createConstructorDeclaration';
import createGetAccessorDeclaration from './createGetAccessorDeclaration';
import getAdapterFilename from './getAdapterFilename';

const adapterFactory = {
	createClassDeclaration,
	createConstructorDeclaration,
	createGetAccessorDeclaration,
	getAdapterFilename
}

export default adapterFactory