import {ICommand} from 'khusamov-base-types';

const repeatableSymbol = Symbol('repeatable')

// TODO Этот декоратор, плагин и плагинируемую очередь надо удалить!

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

/**
 * Проверка, имеет ли конструктор команды пометку 'repeatable' или нет.
 * @param command
 */
const isMarkedAsRepeatable = (command: ICommand) => repeatableSymbol in command.constructor

export {
	repeatable as default,
	isMarkedAsRepeatable
}