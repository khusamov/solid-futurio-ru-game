import {ICommand} from 'khusamov-base-types';

/**
 * @link https://metanit.com/sharp/wpf/22.3.php
 * @link https://docs.microsoft.com/en-us/windows/communitytoolkit/mvvm/relaycommand
 */
export default class RelayCommand implements ICommand {
	readonly #name: string | undefined

	public get name(): string {
		const prefix = 'RelayCommand'
		return this.#name ? `${prefix}: ${this.#name}` : prefix
	}

	/**
	 * Конструктор команды с пользовательской функцией.
	 * @param action Пользовательская функция.
	 * @param name Имя команды.
	 */
	constructor(
		private action: () => void,
		name?: string
	) {
		this.#name = name
	}

	execute(): void {
		this.action()
	}
}