import {ICommand} from 'khusamov-base-types';
import ICommandQueuePlugin from '../../CommandQueue/ICommandQueuePlugin';
import RepeatableCommand from './RepeatableCommand';
import {repeatableSymbol} from './repeatable';

export default class RepeatablePlugin implements ICommandQueuePlugin {
	processingBeforeEnqueue(command: ICommand): ICommand {
		if (repeatableSymbol in command.constructor) {
			command = new RepeatableCommand(command)
		}
		return command
	}
}