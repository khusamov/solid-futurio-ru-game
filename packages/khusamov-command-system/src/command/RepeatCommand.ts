import {IQueue, ICommand} from 'khusamov-base-types';

/**
 * Повторение команд.
 *
 * Данная команда просто добавляет требуемую команду в очередь.
 * Предназначена для создания повторяющихся команд.
 */
export default class RepeatCommand implements ICommand {
	public commandQueue?: IQueue<ICommand>

	public get name(): string {
		return 'RepeatCommand: ' + this.targetCommand.name
	}

	/**
	 * Конструктор повторяющей команды.
	 * @param targetCommand
	 */
	public constructor(
		private targetCommand: ICommand
	) {}

	public execute(): void {
		if (!this.commandQueue) {
			throw new Error(`RepeatCommand: Не найдена очередь команд для добавления в нее команды '${this.targetCommand.name}'`)
		}

		// Внимание, очередь команд сама позаботится об определении свойства 'this.targetCommand.commandQueue'.
		this.commandQueue.enqueue(this.targetCommand)
	}
}