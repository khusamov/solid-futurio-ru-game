import {IUniversalObject} from 'khusamov-universal-object';
import {resolve} from 'khusamov-inversion-of-control';
import {NotFoundTargetObjectError} from '../../errors';
import {RepeatableCommand} from '../RepeatableCommand';
import {ICommand} from '../../interfaces';
import {IStartCommandOrder} from './IStartCommandOrder';
import {StartCommand} from './StartCommand';

export function startCommandResolver(startCommandOrder: IStartCommandOrder): ICommand {
	const targetObject = resolve<IUniversalObject | undefined>(...startCommandOrder.targetObject)

	if (!targetObject) {
		throw new NotFoundTargetObjectError(startCommandOrder.targetObject)
	}

	const command = resolve<ICommand>(startCommandOrder.command.type, startCommandOrder.command)

	return (
		new StartCommand(
			startCommandOrder.commandName,
			targetObject,
			(
				command instanceof RepeatableCommand
					? command
					: new RepeatableCommand(command)
			)
		)
	)
}