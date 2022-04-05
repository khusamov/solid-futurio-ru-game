import {Convert, IUniversalObject, TUniversalObjectValueName} from 'khusamov-base-types';

type TValueName = TUniversalObjectValueName

export default class UniversalObject<V> implements IUniversalObject<V> {
	#map: Map<TValueName, V> = new Map

	public setValue(name: TValueName, value: any) {
		this.#map.set(name, value)
	}

	public getValue(name: TValueName): V | undefined {
		if (!this.#map.has(name)) {
			throw new Error(`Не найден ключ ${name}`)
		}

		return this.#map.get(name)
	}

	public get items() {
		return Convert.toArray<TValueName, V>(this.#map)
	}
}