const repeatableSymbol = Symbol('repeatable')

/**
 * Пометка команды, что она является повторяемой.
 *
 * Если команду пометить декоратором repeatable, то при добавлении
 * этой команды в очередь будет производиться обертка:
 * new RepeatableCommand(MyCommand)
 *
 * Не забудьте добавить в очередь команд CommandQueue плагин RepeatablePlugin,
 * который собственно и производит данную обертку.
 */
const repeatable: ClassDecorator = (
	target => {
		const repeatableAttributes: PropertyDescriptor & ThisType<any> = {
			value: true,
			writable: false
		}
		Object.defineProperty(target, repeatableSymbol, repeatableAttributes)
	}
)

export {
	repeatable as default,
	repeatableSymbol
}