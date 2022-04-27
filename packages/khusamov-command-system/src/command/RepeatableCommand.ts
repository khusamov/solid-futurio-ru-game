import {ICommand, IStoppable} from 'khusamov-base-types';
import NotOperationCommand from './NotOperationCommand';
import BridgeCommand from './BridgeCommand';
import MacroCommand from './MacroCommand';
import RepeatCommand from './RepeatCommand';

/**
 * Повторяемая команда.
 *
 * После выполнения команды targetCommand ставит себя в начало очереди.
 * Можно остановить вызвав метод stop().
 */
export default class RepeatableCommand extends BridgeCommand implements IStoppable {
	public get name(): string {
		return 'RepeatableCommand: ' + this.targetCommand.name
	}

	public constructor(
		private targetCommand: ICommand
	) {
		super()
		this.inject(
			new MacroCommand([
				targetCommand,
				new RepeatCommand(this)
			])
		)
	}

	public stop(): void {
		this.inject(new NotOperationCommand)
	}
}