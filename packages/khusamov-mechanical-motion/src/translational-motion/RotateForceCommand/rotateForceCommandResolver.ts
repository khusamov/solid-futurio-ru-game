import {IUniversalObject} from 'khusamov-universal-object';
import {resolve} from 'khusamov-inversion-of-control';
import {NotFoundTargetObjectError} from 'khusamov-command-system';
import {IRotateForceCommandOrder} from './IRotateForceCommandOrder';
import {RotateForceCommand} from './RotateForceCommand';
import {MovableAdapter} from '../../interfaces';

export function rotateForceCommandResolver(rotateForceCommandOrder: IRotateForceCommandOrder) {
	const targetObject = resolve<IUniversalObject | undefined>(...rotateForceCommandOrder.targetObject)

	if (!targetObject) {
		throw new NotFoundTargetObjectError(rotateForceCommandOrder.targetObject)
	}

	return (
		new RotateForceCommand(
			new MovableAdapter(targetObject),
			rotateForceCommandOrder.increment
		)
	)
}