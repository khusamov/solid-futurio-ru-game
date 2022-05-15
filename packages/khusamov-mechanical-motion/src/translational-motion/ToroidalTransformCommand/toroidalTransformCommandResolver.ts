import {ISize} from 'khusamov-base-types';
import {IUniversalObject} from 'khusamov-universal-object';
import {resolve} from 'khusamov-inversion-of-control';
import {NotFoundTargetObjectError} from 'khusamov-command-system';
import {MovableAdapter} from '../../interfaces';
import {IToroidalTransformCommandOrder} from './IToroidalTransformCommandOrder';
import {ToroidalTransformCommand} from './ToroidalTransformCommand';

export function toroidalTransformCommandResolver(toroidalTransformCommandOrder: IToroidalTransformCommandOrder) {
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