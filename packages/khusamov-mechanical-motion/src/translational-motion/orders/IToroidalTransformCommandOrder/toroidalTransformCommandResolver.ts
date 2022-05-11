import {ISize} from 'khusamov-base-types';
import {IUniversalObject} from 'khusamov-universal-object';
import {resolve} from 'khusamov-inversion-of-control';
import {NotFoundTargetObjectError} from 'khusamov-command-order-system';
import {MovableAdapter} from '../../../interfaces/IMovable';
import ToroidalTransformCommand from '../../ToroidalTransformCommand';
import ToroidalTransformCommandOrderAdapter from './ToroidalTransformCommandOrderAdapter';

export default function toroidalTransformCommandResolver(toroidalTransformCommandOrderObject: IUniversalObject) {
	const toroidalTransformCommandOrder = new ToroidalTransformCommandOrderAdapter(toroidalTransformCommandOrderObject)

	const targetObject = resolve<IUniversalObject | undefined>(...toroidalTransformCommandOrder.targetObject)

	if (!targetObject) {
		throw new NotFoundTargetObjectError(toroidalTransformCommandOrder.targetObject)
	}

	return (
		new ToroidalTransformCommand(
			new MovableAdapter(targetObject),
			() => resolve<ISize>(...toroidalTransformCommandOrder.toroidalSurfaceSize)
		)
	)
}