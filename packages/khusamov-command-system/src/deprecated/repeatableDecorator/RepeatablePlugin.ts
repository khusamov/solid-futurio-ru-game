import {ICommand} from 'khusamov-base-types';

import {isMarkedAsRepeatable} from './repeatable';
import {ICommandQueuePlugin} from '../CommandQueue';
import RepeatableCommand from '../../command/RepeatableCommand';

/**
 * Данный плагин перехватывает команды, которые помечены декоратором @repeatable
 * и оборачивает их в new RepeatableCommand(command).
 */
export default class RepeatablePlugin implements ICommandQueuePlugin {
	processingBeforeEnqueue(command: ICommand): ICommand {
		if (isMarkedAsRepeatable(command)) {
			command = new RepeatableCommand(command)
		}
		return command
	}
}