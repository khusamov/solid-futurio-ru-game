import {IQueue, ICommand} from 'khusamov-base-types';

/**
 * Повторение команд.
 *
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
		if (this.isChangeTargetCommandQueue) {
			this.targetCommand.commandQueue = commandQueue
		}
	}

	public get name(): string {
		return 'RepeatCommand: ' + this.targetCommand.name
	}

	/**
	 * Конструктор повторяющей команды.
	 * @param targetCommand
	 * @param isChangeTargetCommandQueue Если true, то очередь команд будет устанавливаться и у зависимой команды targetCommand.
	 * Обычно targetCommand это родительская команда и устанавливать у нее очередь команд нельзя: во-первых смысла нет, там уже
	 * очередь установлена, а во-вторых это приведет к зацикливанию. Поэтому данный параметр по-умолчанию равен false.
	 */
	public constructor(
		private targetCommand: ICommand,
		private isChangeTargetCommandQueue: boolean = false
	) {}

	public execute(): void {
		this.commandQueue?.enqueue(this.targetCommand)
	}
}