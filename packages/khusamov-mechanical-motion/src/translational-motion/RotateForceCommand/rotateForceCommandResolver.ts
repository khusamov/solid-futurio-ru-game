import {createAdapter, IUniversalObject} from 'khusamov-universal-object';
import {resolve} from 'khusamov-inversion-of-control';
import {NotFoundTargetObjectError} from 'khusamov-command-system';
import {IRotateForceCommandOrder} from './IRotateForceCommandOrder';
import {RotateForceCommand} from './RotateForceCommand';
import {MovableAdapter, RigidBodyAdapter} from '../../interfaces';

export function rotateForceCommandResolver(rotateForceCommandOrder: IRotateForceCommandOrder) {
	const targetObject = resolve<IUniversalObject | undefined>(...rotateForceCommandOrder.targetObject)

	if (!targetObject) {
		throw new NotFoundTargetObjectError(rotateForceCommandOrder.targetObject)
	}

	return (
		new RotateForceCommand(
			createAdapter(targetObject, RigidBodyAdapter, MovableAdapter),
			rotateForceCommandOrder.increment
		)
	)
}