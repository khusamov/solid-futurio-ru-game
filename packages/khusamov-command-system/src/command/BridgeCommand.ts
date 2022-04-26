import {ICommand, IInjectableCommand, IQueue} from 'khusamov-base-types';
import NotOperationCommand from './NotOperationCommand';

/**
 * Команда, которая выполняет другую команду.
 * Есть возможность заменить выполняемую команду.
 * Предназначена для создания повторяющихся команд.
 */
export default class BridgeCommand implements IInjectableCommand {
	#commandQueue?: IQueue<ICommand>
	private internalCommand: ICommand = new NotOperationCommand

	public get commandQueue() {
		return this.#commandQueue
	}

	public set commandQueue(commandQueue) {
		this.#commandQueue = commandQueue
		this.internalCommand.commandQueue = this.commandQueue
	}

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
		this.internalCommand.commandQueue = this.commandQueue
	}

	public execute() {
		this.internalCommand.execute()
	}
}