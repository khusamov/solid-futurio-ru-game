import {IQueue, ICommand} from 'khusamov-base-types';

/**
 * Повторение команд.
 * Данная команда просто добавляет требуемую команду в очередь.
 * Предназначена для создания повторяющихся команд.
 */
export default class RepeatCommand implements ICommand {
	#commandQueue?: IQueue<ICommand>

	public get commandQueue() {
		return this.#commandQueue
	}

	public set commandQueue(commandQueue) {
		this.#commandQueue = commandQueue
		if (this.recursion) {
			this.targetCommand.commandQueue = commandQueue
		}
	}

	public get name(): string {
		return 'RepeatCommand: ' + this.targetCommand.name
	}

	/**
	 * Конструктор повторяющей команды.
	 * @param targetCommand
	 * @param recursion Если true, то очередь команд будет устанавливаться и у зависимой команды targetCommand.
	 */
	public constructor(
		private targetCommand: ICommand,
		private recursion: boolean = true
	) {}

	public execute(): void {
		this.commandQueue?.enqueue(this.targetCommand)
	}
}