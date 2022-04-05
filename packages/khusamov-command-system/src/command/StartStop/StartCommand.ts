import {ICommand, IQueue, IInjectableCommand} from 'khusamov-base-types';
import {IoC} from 'khusamov-inversion-of-control';
import IStartStopObject from './IStartStopObject';

/**
 * Запуск длительной команды.
 */
export default class StartCommand implements ICommand {
	/**
	 *  Конструктор.
	 * @param startStopObject Объект, для которого требуется запуск определенной команды.
	 * @param longTermCommand Запускаемая команда.
	 * @param longTermCommandName Имя запускаемой команды. Требуется для остановки.
	 */
	constructor(
		private startStopObject: IStartStopObject,
		private longTermCommand: IInjectableCommand,
		private longTermCommandName: string
	) {}

	public execute(): void {
		const commandQueue = IoC.resolve<IQueue<ICommand>>('CommandQueue')
		this.startStopObject.startStopCommands.set(this.longTermCommandName, this.longTermCommand)
		commandQueue.enqueue(this.longTermCommand)
	}
}