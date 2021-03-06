import {IKeyValueObject} from 'khusamov-base-types';

export type TUniversalValueName = string
export type TUniversalItems = IKeyValueObject<TUniversalValueName, any | undefined>

export function isUniversalObject(object: any): object is IUniversalObject {
	return (
		'getValue' in object &&
		'setValue' in object &&
		'items' in object &&
		typeof object.getValue === 'function' &&
		typeof object.setValue === 'function' &&
		Array.isArray(object.items)
	)
}

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
	 * Получить значение элемента.
	 * @param name
	 * @param defaultValue
	 */
	getValue<V>(name: TUniversalValueName, defaultValue: V): V

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