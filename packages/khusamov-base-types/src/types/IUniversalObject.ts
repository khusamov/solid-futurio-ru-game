export type TValueName = string

export interface IItem<K, V> {
	key: K
	value: V | undefined
}

export default interface IUniversalObject {
	getValue<V>(name: TValueName): V | undefined
	setValue<V>(name: TValueName, value: V): void
	readonly items: IItem<TValueName, any>[]
}