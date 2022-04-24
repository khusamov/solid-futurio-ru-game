import UniversalObject from './UniversalObject';
import IUniversalObject from './IUniversalObject';
import fillUniversalObject from './fillUniversalObject';

/**
 * Создать IUniversalObject на основе plane-объекта.
 * @param object
 * @param universalObject
 */
export default (
	function createUniversalObject<T extends object>(object: T): IUniversalObject {
		return fillUniversalObject(new UniversalObject, object)
	}
)