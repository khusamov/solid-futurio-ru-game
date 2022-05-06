import {ICommand, IInjectableCommand, IQueue} from 'khusamov-base-types';
import NotOperationCommand from './NotOperationCommand';

/**
 * Команда, которая выполняет другую команду.
 * Есть возможность заменить выполняемую команду.
 * Предназначена для создания повторяющихся команд.
 */
export default class BridgeCommand implements IInjectableCommand {
	public commandQueue?: IQueue<ICommand>
	private internalCommand: ICommand = new NotOperationCommand

	public get name(): string {
		return 'BridgeCommand: ' + this.internalCommand.name
	}

	public constructor(internalCommand?: ICommand) {
		if (internalCommand) {
			this.inject(internalCommand)
		}
	}

	/**
	 * Внедрить команду.
	 * @param internalCommand
	 */
	public inject(internalCommand: ICommand) {
		this.internalCommand = internalCommand
	}

	public execute() {
		if (this.commandQueue) {
			this.internalCommand.commandQueue = this.commandQueue
		}
		this.internalCommand.execute()
	}
}