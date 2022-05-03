import IUniversalObject from '../types/IUniversalObject';

/**
 * Заполнить универсальный объект значениями свойств plane-объекта.
 * Внимание, объект universalObject будет изменен.
 * @param universalObject
 * @param object
 */
export default function fillUniversalObject<T extends object, U extends IUniversalObject = IUniversalObject>(universalObject: U, object: T): U {
	const result = universalObject
	for (const key in object) {
		if (object.hasOwnProperty(key)) {
			result.setValue(key, object[key])
		}
	}
	return result
}