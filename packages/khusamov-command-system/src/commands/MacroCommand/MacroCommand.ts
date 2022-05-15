import {IQueue} from 'khusamov-base-types';
import {ICommand} from '../../interfaces';

/**
 * Макро-команда.
 * Предназначена для создания набора команд, которые выполняются как одно целое.
 * Используется для создания повторяющихся команд.
 */
export class MacroCommand implements ICommand {
	public commandQueue?: IQueue<ICommand>

	public constructor(
		private commands: ICommand[]
	) {}

	public execute(): void {
		for (const command of this.commands) {
			if (this.commandQueue) {
				command.commandQueue = this.commandQueue
			}
			command.execute()
		}
	}
}