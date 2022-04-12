import {ICommand, IQueue} from 'khusamov-base-types';

/**
 * Макро-команда.
 * Предназначена для создания набора команд, которые выполняются как одно целое.
 * Используется для создания повторяющихся команд.
 */
export default class MacroCommand implements ICommand {
	#commandQueue?: IQueue<ICommand>

	get commandQueue() {
		return this.#commandQueue
	}

	set commandQueue(commandQueue) {
		this.#commandQueue = commandQueue
		for (const command of this.commands) {
			command.commandQueue = this.commandQueue
		}
	}

	constructor(
		private commands: ICommand[]
	) {}

	public execute(): void {
		for (const command of this.commands) {
			command.execute()
		}
	}
}