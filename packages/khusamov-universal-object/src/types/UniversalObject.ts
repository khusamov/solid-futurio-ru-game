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
	public getValue<V>(name: TValueName): V | undefined {
		return this.map.get(name)
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
		return Convert.toArray<TValueName, any | undefined>(this.map)
	}
}