import {ITyped} from 'khusamov-base-types';
import {resolve} from 'khusamov-inversion-of-control';
import IUniversalObject from '../types/IUniversalObject';
import findUniversalObject from './findUniversalObject';
import withoutType from './withoutType';

type TUniversalObjectList = IUniversalObject[]

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
	const universalObjectList = resolve<TUniversalObjectList>(params.type + 'List')
	return findUniversalObject(universalObjectList, withoutType(params))
}