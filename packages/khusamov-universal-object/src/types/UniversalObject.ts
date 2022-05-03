import {Convert} from 'khusamov-base-types';
import IUniversalObject, {TUniversalValueName} from './IUniversalObject';

type TValueName = TUniversalValueName

/**
 * Объект, который хранит в себе набор разнотипных свойств.
 * Простая реализация интерфейса IUniversalObject.
 */
export default class UniversalObject implements IUniversalObject {
	private map: Map<TValueName, any> = new Map

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
	getValue<V>(name: TUniversalValueName, defaultValue?: V): V {
		const value = this.map.get(name)
		return value === undefined ? defaultValue : value
	}

	/**
	 * Установить значение элемента.
	 * @param name
	 * @param value
	 */
	public setValue<V>(name: TValueName, value: V) {
		this.map.set(name, value)
	}

	/**
	 * Получить список элементов в виде массива,
	 * где каждый элемент представлен двумя ключами: key и value.
	 */
	public get items() {
		return Convert.toArray<TValueName, any>(this.map)
	}
}