import {IUniversalObject} from 'khusamov-universal-object';
import {resolve} from 'khusamov-inversion-of-control';
import {NotFoundTargetObjectError} from 'khusamov-command-order-system';
import MovableAdapter from '../../../MovableAdapter';
import RotateForceCommand from '../../RotateForceCommand';
import RotateForceCommandOrderAdapter from './RotateForceCommandOrderAdapter';

export default function rotateForceCommandResolver(rotateForceCommandOrderObject: IUniversalObject) {
	const rotateForceCommandOrder = new RotateForceCommandOrderAdapter(rotateForceCommandOrderObject)

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