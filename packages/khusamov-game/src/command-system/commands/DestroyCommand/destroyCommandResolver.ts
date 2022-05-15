import {IUniversalObject} from 'khusamov-universal-object';
import {resolve} from 'khusamov-inversion-of-control';
import {ICommand, NotFoundTargetObjectError} from 'khusamov-command-system';
import {IDestroyOrder} from './IDestroyOrder';
import {DestroyCommand} from './DestroyCommand';

export function destroyCommandResolver(destroyOrder: IDestroyOrder): ICommand {
	const targetObject = resolve<IUniversalObject | undefined>(...destroyOrder.targetObject)

	if (!targetObject) {
		throw new NotFoundTargetObjectError(destroyOrder.targetObject)
	}

	return new DestroyCommand(targetObject)
}