import IKeyValueObject from './IKeyValueObject';

type TMapConvertResult<K, V> = IKeyValueObject<K, V | undefined>[]

/**
 * Конвертация разнообразных значений.
 */
export default class Convert {
	/**
	 * Конвертировать карту в массив key/value-объектов.
	 * @param map
	 */
	public static toArray<K, V>(map: Map<K, V>): TMapConvertResult<K, V> {
		const result: TMapConvertResult<K, V> = []
		for (const [key, value] of map) {
			result.push({key, value})
		}
		return result
	}
}