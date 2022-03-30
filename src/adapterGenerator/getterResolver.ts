import IUniversalObject from '../types/IUniversalObject';

export default function getterResolver<T>(universalObject: IUniversalObject, propertyName: string): T {
	return universalObject.getValue<T>(propertyName)
}