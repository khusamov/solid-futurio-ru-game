import {IStoppable} from 'khusamov-base-types';
import {NotOperationCommand} from './NotOperationCommand';
import {BridgeCommand} from './BridgeCommand';
import {RepeatCommand} from './RepeatCommand';
import {MacroCommand} from './MacroCommand';
import {ICommand} from '../interfaces';

/**
 * Повторяемая (длительная) команда.
 *
 * После выполнения команды targetCommand ставит себя в начало очереди.
 * Можно остановить вызвав метод stop().
 */
export class RepeatableCommand extends BridgeCommand implements IStoppable {
	public constructor(targetCommand: ICommand) {
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