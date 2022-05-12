import getAdapterFilename from './getAdapterFilename';
import createClassDeclaration from './createClassDeclaration';
import createConstructorDeclaration from './createConstructorDeclaration';
import createGetAccessorDeclaration from './createGetAccessorDeclaration';
import createSetAccessorDeclaration from './createSetAccessorDeclaration';

const adapterFactory = {
	getAdapterFilename,
	createClassDeclaration,
	createConstructorDeclaration,
	createGetAccessorDeclaration,
	createSetAccessorDeclaration
}

export default adapterFactory