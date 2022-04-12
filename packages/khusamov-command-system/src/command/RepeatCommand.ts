import {IQueue, ICommand} from 'khusamov-base-types';

/**
 * Повторение команд.
 * Данная команда просто добавляет требуемую команду в очередь.
 * Предназначена для создания повторяющихся команд.
 */
export default class RepeatCommand implements ICommand {
	#commandQueue?: IQueue<ICommand>

	get commandQueue() {
		return this.#commandQueue
	}

	set commandQueue(commandQueue) {
		this.#commandQueue = commandQueue
		this.targetCommand.commandQueue = commandQueue
	}

	constructor(
		private targetCommand: ICommand
	) {}

	public execute(): void {
		this.commandQueue?.enqueue(this.targetCommand)
	}
}