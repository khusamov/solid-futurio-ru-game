import {IKeyValueObject} from 'khusamov-base-types';

export type TUniversalValueName = string
export type TUniversalItems = IKeyValueObject<TUniversalValueName, any | undefined>

/**
 * Объект, который хранит в себе набор разнотипных свойств.
 */
export default interface IUniversalObject {
	/**
	 * Получить значение элемента.
	 * @param name
	 */
	getValue<V>(name: TUniversalValueName): V | undefined

	/**
	 * Установить значение элемента.
	 * @param name
	 * @param value
	 */
	setValue<V>(name: TUniversalValueName, value: V): void

	/**
	 * Получить список элементов в виде массива,
	 * где каждый элемент представлен двумя ключами: key и value.
	 */
	readonly items: TUniversalItems[]
}