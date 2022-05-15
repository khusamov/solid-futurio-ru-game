import {resolve} from 'khusamov-inversion-of-control';
import {IUniversalObject} from 'khusamov-universal-object';
import {ICommand} from '../../interfaces';
import {NotFoundTargetObjectError} from '../../errors';
import {IStopCommandOrder} from './IStopCommandOrder';
import {StopCommand} from './StopCommand';

export function stopCommandResolver(stopCommandOrder: IStopCommandOrder): ICommand {
	const targetObject = resolve<IUniversalObject | undefined>(...stopCommandOrder.targetObject)

	if (!targetObject) {
		throw new NotFoundTargetObjectError(stopCommandOrder.targetObject)
	}

	return (
		stopCommandOrder.commandName
			? new StopCommand(stopCommandOrder.commandName, targetObject)
			: new StopCommand(targetObject)
	)
}


