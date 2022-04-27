import {IUniversalObject} from 'khusamov-base-types';

/**
 * Поиск объекта.
 * Ищется первый объект для которого совпадает хотя бы один из параметров.
 * @param list Массив объектов, в котором производится поиск.
 * @param params Параметры искомого объекта.
 */
export default function findUniversalObject<P extends object, U extends IUniversalObject>(list: U[], params: P): U | undefined {
	const predicate = (object: IUniversalObject) => (
		Object.entries<any>(params).reduce(
			(result: boolean, [key, value]) => result && object.getValue(key) === value,
			true
		)
	)

	return list.find(predicate)
}