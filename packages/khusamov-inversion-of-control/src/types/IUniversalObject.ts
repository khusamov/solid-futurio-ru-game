export type TValueName = string

export interface IItem<K, V> {
	key: K
	value: V | undefined
}

export default interface IUniversalObject<V> {
	getValue(name: TValueName): V | undefined
	setValue(name: TValueName, value: V): void
	readonly items: IItem<TValueName, V>[]
}