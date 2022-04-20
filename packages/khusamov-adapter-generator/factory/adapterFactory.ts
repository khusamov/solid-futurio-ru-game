import createClassDeclaration from './adapter/createClassDeclaration';
import createConstructorDeclaration from './adapter/createConstructorDeclaration';
import createGetAccessorDeclaration from './adapter/createGetAccessorDeclaration';
import getAdapterFilename from './adapter/getAdapterFilename';

const adapterFactory = {
	createClassDeclaration,
	createConstructorDeclaration,
	createGetAccessorDeclaration,
	getAdapterFilename
}

export default adapterFactory