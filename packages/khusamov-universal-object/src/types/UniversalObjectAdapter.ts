import IUniversalObject, {TUniversalItems, TUniversalValueName} from './IUniversalObject';

export default class UniversalObjectAdapter implements IUniversalObject {
	public get items(): TUniversalItems[] {
		// TODO Реализовать свойство items.
		throw new Error('Свойство UniversalObjectAdapter.items не реализовано')
	}

	public constructor(
		private plainObject: object
	) {}

	public getValue<V>(name: TUniversalValueName): V | undefined {
		return Reflect.get(this.plainObject, name)
	}

	public setValue<V>(name: TUniversalValueName, value: V): void {
		Reflect.set(this.plainObject, name, value)
	}
}