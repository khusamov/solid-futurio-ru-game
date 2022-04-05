import {ICommand} from 'khusamov-base-types';
import NotOperationCommand from '../NotOperationCommand';
import IStartStopObject from './IStartStopObject';

/**
 * Остановка длительной команды.
 */
export default class StopCommand implements ICommand {
	/**
	 * Конструктор.
	 * @param startStopObject Объект, для которого требуется остановка определенной команды.
	 * @param longTermCommandName Имя останавливаемой команды.
	 */
	constructor(
		private startStopObject: IStartStopObject,
		private longTermCommandName: string
	) {}

	public execute(): void {
		const longTermCommand = this.startStopObject.startStopCommands.get(this.longTermCommandName)
		if (longTermCommand) {
			longTermCommand.inject(new NotOperationCommand)
		}
	}
}