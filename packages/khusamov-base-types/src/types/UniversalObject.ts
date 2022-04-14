import IUniversalObject from './IUniversalObject';
import Convert from './Convert';
import {TUniversalObjectValueName} from '../index';

type TValueName = TUniversalObjectValueName

export default class UniversalObject implements IUniversalObject {
	#map: Map<TValueName, any> = new Map

	public setValue<V>(name: TValueName, value: V) {
		this.#map.set(name, value)
	}

	public getValue<V>(name: TValueName): V | undefined {
		if (!this.#map.has(name)) {
			throw new Error(`Не найден ключ ${name}`)
		}

		return this.#map.get(name)
	}

	public get items() {
		return Convert.toArray<TValueName, any>(this.#map)
	}
}