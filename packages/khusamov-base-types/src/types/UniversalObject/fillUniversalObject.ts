import IUniversalObject from './IUniversalObject';

/**
 * Заполнить универсальный объект значениями свойств plane-объекта.
 * @param universalObject
 * @param object
 */
export default function fillUniversalObject<T extends object>(universalObject: IUniversalObject, object: T): IUniversalObject {
	const result = universalObject
	for (const key in object) {
		if (object.hasOwnProperty(key)) {
			result.setValue(key, object[key])
		}
	}
	return result
}