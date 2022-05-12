import {IUniversalObject} from 'khusamov-universal-object';
import {ICommand} from 'khusamov-base-types';
import {resolve} from 'khusamov-inversion-of-control';
import {NotFoundTargetObjectError} from 'khusamov-command-order-system';
import DestroyOrderAdapter from './DestroyOrderAdapter';
import DestroyCommand from '../../commands/DestroyCommand';

export default function destroyCommandResolver(destroyOrderObject: IUniversalObject): ICommand {
	const destroyOrder = new DestroyOrderAdapter(destroyOrderObject)

	const targetObject = resolve<IUniversalObject | undefined>(...destroyOrder.targetObject)

	if (!targetObject) {
		throw new NotFoundTargetObjectError(destroyOrder.targetObject)
	}

	return new DestroyCommand(targetObject)
}