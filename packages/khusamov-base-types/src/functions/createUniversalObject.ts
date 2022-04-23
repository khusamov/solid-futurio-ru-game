import UniversalObject from '../types/UniversalObject';
import IUniversalObject from '../types/IUniversalObject';

/**
 * Создать UniversalObject на основе plane-объекта.
 * @param object
 */
export default function createUniversalObject<T extends object>(object: T): IUniversalObject {
	const result = new UniversalObject
	for (const key in object) {
		if (object.hasOwnProperty(key)) {
			result.setValue(key, object[key])
		}
	}
	return result
}