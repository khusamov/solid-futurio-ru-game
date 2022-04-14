import UniversalObject from '../types/UniversalObject';

/**
 * Создать UniversalObject на основе plane-объекта.
 * @param object
 */
export default function createUniversalObject<T extends object>(object: T): UniversalObject {
	const result = new UniversalObject
	for (const key in object) {
		if (object.hasOwnProperty(key)) {
			result.setValue(key, object[key])
		}
	}
	return result
}