import IUniversalObject from '../types/IUniversalObject';

export default class UniversalObject implements IUniversalObject {
	#map: Map<string, any> = new Map

	public setValue(name: string, value: any) {
		this.#map.set(name, value)
	}

	public getValue<T>(name: string): T {
		if (!this.#map.has(name)) {
			throw new Error(`Не найден ключ ${name}`)
		}

		return this.#map.get(name)
	}
}