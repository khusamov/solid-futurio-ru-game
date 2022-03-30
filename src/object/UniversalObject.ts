export default class UniversalObject {
	#map: Map<string, any> = new Map

	public delete(name: string) {
		// Обычно, это не проблема - задача delete, чтобы значения с данным ключом не было,
		// поэтому, если до вызова delete ключа не было, то задача уже выполнена
		// https://github.com/khusamov/solid-futurio-ru/pull/1#discussion_r813171547
		if (!this.#map.has(name)) return;

		this.#map.delete(name)
	}

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