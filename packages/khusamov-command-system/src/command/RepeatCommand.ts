import {IQueue, ICommand} from 'khusamov-base-types';
import {IoC} from 'khusamov-inversion-of-control';

/**
 * Повторение команд.
 * Данная команда просто добавляет требуемую команду в очередь.
 * Предназначена для создания повторяющихся команд.
 */
export default class RepeatCommand implements ICommand {
	constructor(
		private targetCommand: ICommand
	) {}

	public execute(): void {
		const commandQueue = IoC.resolve<IQueue<ICommand>>('CommandQueue')
		commandQueue.enqueue(this.targetCommand)
	}
}