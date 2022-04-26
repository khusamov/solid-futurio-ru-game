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
		if (this.recursion) {
			this.targetCommand.commandQueue = commandQueue
		}
	}

	get name(): string {
		return 'RepeatCommand: ' + this.targetCommand.name
	}

	/**
	 * Конструктор повторяющей команды.
	 * @param targetCommand
	 * @param recursion Если true, то очередь команд будет устанавливаться и у зависимой команды targetCommand.
	 */
	constructor(
		private targetCommand: ICommand,
		private recursion: boolean = true
	) {}

	public execute(): void {
		this.commandQueue?.enqueue(this.targetCommand)
	}
}