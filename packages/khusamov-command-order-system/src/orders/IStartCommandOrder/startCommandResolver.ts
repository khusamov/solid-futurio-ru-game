import {ICommand} from 'khusamov-base-types';
import {createUniversalObject, IUniversalObject} from 'khusamov-universal-object';
import {resolve} from 'khusamov-inversion-of-control';
import {RepeatableCommand, StartCommand} from 'khusamov-command-system';
import NotFoundTargetObjectError from '../../errors/NotFoundTargetObjectError';
import StartCommandOrderAdapter from './StartCommandOrderAdapter';

export default function startCommandResolver(startCommandOrderObject: IUniversalObject): ICommand {
	const startCommandOrder = new StartCommandOrderAdapter(startCommandOrderObject)

	const targetObject = resolve<IUniversalObject | undefined>(...startCommandOrder.targetObject)

	if (!targetObject) {
		throw new NotFoundTargetObjectError(startCommandOrder.targetObject)
	}

	const command = resolve<ICommand>(startCommandOrder.command.type, createUniversalObject(startCommandOrder.command))

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