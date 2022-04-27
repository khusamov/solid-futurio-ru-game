import {ITyped, IUniversalObject} from 'khusamov-base-types';
import findUniversalObject from './findUniversalObject';
import {resolve} from 'khusamov-inversion-of-control';

/**
 * Разрешение зависимости вида <Тип объекта>.
 *
 * Позволяет найти объект этого типа по набору признаков params.
 * Поиск объекта будет будет производится в массиве, который будет найден как зависимость <Тип объекта + List>.
 *
 * Пример регистрации такой зависимости:
 * - register('GameObject', universalObjectResolver).
 * - register('GameObjectList', (): IUniversalObject => [])
 *
 * @param params Параметры искомого объекта. Поле type не участвует в поиске.
 */
export default function universalObjectResolver<T extends ITyped>(params: T): IUniversalObject | undefined {
	const universalObjectList = resolve<IUniversalObject[]>(params.type + 'List')

	const paramsWithoutType: Partial<T> = Object.assign({}, params)
	delete paramsWithoutType.type

	return findUniversalObject(universalObjectList, paramsWithoutType)
}