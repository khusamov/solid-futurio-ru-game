import {ICommand, IInjectableCommand} from 'khusamov-base-types';

/**
 * Команда, которая выполняет другую команду.
 * Есть возможность заменить выполняемую команду.
 * Предназначена для создания повторяющихся команд.
 */
export default class BridgeCommand implements IInjectableCommand {
	constructor(
		private internalCommand?: ICommand
	) {}

	public inject(internalCommand: ICommand) {
		this.internalCommand = internalCommand
	}

	public execute() {
		this.internalCommand?.execute()
	}
}