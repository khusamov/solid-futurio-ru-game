import {IQueue} from 'khusamov-base-types';
import {ICommand} from '../interfaces';

/**
 * Повторение команд.
 *
 * Данная команда просто добавляет требуемую команду в очередь.
 * Предназначена для создания повторяющихся команд.
 */
export class RepeatCommand implements ICommand {
	public commandQueue?: IQueue<ICommand>

	/**
	 * Конструктор повторяющей команды.
	 * @param targetCommand
	 */
	public constructor(
		private targetCommand: ICommand
	) {}

	public execute(): void {
		if (!this.commandQueue) {
			throw new Error(`RepeatCommand: Не найдена очередь команд`)
		}

		// Внимание, очередь команд сама позаботится о заполнении свойства 'this.targetCommand.commandQueue'.
		this.commandQueue.enqueue(this.targetCommand)
	}
}