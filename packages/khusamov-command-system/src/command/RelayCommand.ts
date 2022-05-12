import {ICommand} from 'khusamov-base-types';

export type TAction = () => void

/**
 * Команда с пользовательской функцией.
 *
 * Так как данная команда может выполнять разные действия, в зависимости
 * от пользовательской функции, то есть возможность изменять имя команды
 * при помощи первого аргумента конструктора.
 *
 * @link https://metanit.com/sharp/wpf/22.3.php
 * @link https://docs.microsoft.com/en-us/windows/communitytoolkit/mvvm/relaycommand
 */
export default class RelayCommand implements ICommand {
	readonly #name: string | undefined
	private readonly action: TAction

	public get name(): string {
		const prefix = 'RelayCommand'
		return this.#name ? `${prefix}: ${this.#name}` : prefix
	}

	/**
	 * Конструктор безымянной команды с пользовательской функцией.
	 * @param action Пользовательская функция, которая реализует действие этой команды.
	 */
	public constructor(action: TAction)

	/**
	 * Конструктор команды с пользовательской функцией.
	 * @param name Имя команды.
	 * @param action Пользовательская функция, которая реализует действие этой команды.
	 */
	public constructor(name: string, action: TAction)

	/**
	 * Конструктор команды с пользовательской функцией.
	 * @param nameOrAction Имя команды или пользовательская функция.
	 * @param action Пользовательская функция, которая реализует действие этой команды.
	 */
	public constructor(nameOrAction: string | TAction, action?: TAction) {
		const [_name, _action] = parseConstructorArguments(nameOrAction, action)
		this.#name = _name
		this.action = _action
	}

	public execute(): void {
		this.action()
	}
}

function parseConstructorArguments(nameOrAction: string | TAction, action?: TAction) {
	return (
		(
			arguments.length === 1
				? [undefined, action]
				: [nameOrAction, action]
		) as [string | undefined, TAction]
	)
}