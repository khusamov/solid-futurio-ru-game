export interface IMapConvertResult<K, V> {
	key: K
	value: V | undefined
}

export default class Convert {
	public static toArray<K, V>(map: Map<K, V>): IMapConvertResult<K, V>[] {
		const result: IMapConvertResult<K, V>[] = []
		for (const [key, value] of map) {
			result.push({key, value})
		}
		return result
	}
}