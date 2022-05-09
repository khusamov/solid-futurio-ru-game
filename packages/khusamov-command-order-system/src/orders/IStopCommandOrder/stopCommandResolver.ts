import {ICommand} from 'khusamov-base-types';
import {resolve} from 'khusamov-inversion-of-control';
import {IUniversalObject} from 'khusamov-universal-object';
import StopCommandOrderAdapter from './StopCommandOrderAdapter';
import NotFoundTargetObjectError from '../../errors/NotFoundTargetObjectError';
import {StopCommand} from 'khusamov-command-system';

export default function stopCommandResolver(stopCommandOrderObject: IUniversalObject): ICommand {
	const stopCommandOrder = new StopCommandOrderAdapter(stopCommandOrderObject)

	const targetObject = resolve<IUniversalObject | undefined>(...stopCommandOrder.targetObject)

	if (!targetObject) {
		throw new NotFoundTargetObjectError(stopCommandOrder.targetObject)
	}

	return (
		stopCommandOrder.command
			? new StopCommand(stopCommandOrder.command, targetObject)
			: new StopCommand(targetObject)
	)
}


