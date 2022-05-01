import IKeyValueObject from './IKeyValueObject';

type TMapConvertResult<K, V> = IKeyValueObject<K, V | undefined>[]
type TPlainObjectConvertResult<K, V> = IKeyValueObject<K, V>[]
type TToArrayConvertResult<K, V> = IKeyValueObject<K, V>[]

/**
 * Конвертация разнообразных значений.
 */
export default class Convert {
	/**
	 * Конвертировать карту или plain-объект в массив key/value-объектов.
	 * @param object
	 */
	public static toArray<K, V>(object: Map<K, V>): TMapConvertResult<K, V>
	public static toArray<K extends keyof any, V>(object: Record<K, V>): TPlainObjectConvertResult<K, V>
	public static toArray<K extends keyof any, V>(object: Map<K, V> | Record<K, V>): TToArrayConvertResult<K, V> {
		const result: TToArrayConvertResult<K, V> = []
		if (object instanceof Map) {
			for (const [key, value] of object) {
				result.push({key, value})
			}
		} else {
			for (const key in object) {
				if (!object.hasOwnProperty(key)) continue
				result.push({key, value: Reflect.get(object, key)})
			}
		}
		return result
	}

	/**
	 * Конвертировать миллисекунды в секунды.
	 * @param millisecond
	 */
	public static toSecond(millisecond: number) {
		return millisecond / 1000
	}
}