/**
 * Клонирует объект и удаляет из него свойство type.
 * @param object
 */
export default function withoutType<T extends {type: any}>(object: T): Omit<T, 'type'> {
	object = Object.assign({}, object)
	delete object.type
	return object
}