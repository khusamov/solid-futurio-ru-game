import IUniversalObject, {TUniversalItems, TUniversalValueName} from './IUniversalObject';

// TODO Удалить UniversalObjectAdapter

/**
 * @deprecated
 */
export default class UniversalObjectAdapter implements IUniversalObject {
	public get items(): TUniversalItems[] {
		// TODO Реализовать свойство items.
		throw new Error('Свойство UniversalObjectAdapter.items не реализовано')
	}

	public constructor(
		private plainObject: object
	) {}

	public getValue<V>(name: TUniversalValueName, defaultValue?: V): V {
		const value = Reflect.get(this.plainObject, name)
		return value === undefined ? defaultValue : value
	}

	public setValue<V>(name: TUniversalValueName, value: V): void {
		Reflect.set(this.plainObject, name, value)
	}
}