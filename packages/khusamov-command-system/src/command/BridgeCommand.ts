import {ICommand, IInjectableCommand, IQueue} from 'khusamov-base-types';

/**
 * Команда, которая выполняет другую команду.
 * Есть возможность заменить выполняемую команду.
 * Предназначена для создания повторяющихся команд.
 */
export default class BridgeCommand implements IInjectableCommand {
	private internalCommand?: ICommand
	#commandQueue?: IQueue<ICommand>

	get commandQueue() {
		return this.#commandQueue
	}

	set commandQueue(commandQueue) {
		this.#commandQueue = commandQueue
		this.updateInternalCommandQueue()
	}

	get name(): string {
		return 'BridgeCommand: ' + (this.internalCommand?.name || '<empty>')
	}

	constructor(
		internalCommand?: ICommand
	) {
		if (internalCommand) {
			this.inject(internalCommand)
		}
	}

	public inject(internalCommand: ICommand) {
		this.internalCommand = internalCommand
		this.updateInternalCommandQueue()
	}

	public execute() {
		this.internalCommand?.execute()
	}

	private updateInternalCommandQueue() {
		if (this.internalCommand) {
			this.internalCommand.commandQueue = this.commandQueue
		}
	}
}