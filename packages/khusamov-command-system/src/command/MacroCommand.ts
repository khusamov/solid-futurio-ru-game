import {ICommand} from 'khusamov-base-types';

/**
 * Макро-команда.
 * Предназначена для создания набора команд, которые выполняются как одно целое.
 * Используется для создания повторяющихся команд.
 */
export default class MacroCommand implements ICommand {
	constructor(
		private commands: ICommand[]
	) {}

	public execute(): void {
		for (const command of this.commands) {
			command.execute()
		}
	}
}