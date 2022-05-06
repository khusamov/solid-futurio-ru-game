import {ICommand, IQueue} from 'khusamov-base-types';

/**
 * Макро-команда.
 * Предназначена для создания набора команд, которые выполняются как одно целое.
 * Используется для создания повторяющихся команд.
 */
export default class MacroCommand implements ICommand {
	public commandQueue?: IQueue<ICommand>

	public get name(): string {
		return 'MacroCommand: ' + (this.commands.map(command => command.name).join(', ') || '<empty>')
	}

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