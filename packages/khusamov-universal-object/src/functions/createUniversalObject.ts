
import UniversalObject from '../types/UniversalObject';
import fillUniversalObject from './fillUniversalObject';

/**
 * Создать IUniversalObject на основе plane-объекта.
 * @param object
 */
export default function createUniversalObject<T extends object>(object: T): UniversalObject {
	return fillUniversalObject(new UniversalObject, object)
}