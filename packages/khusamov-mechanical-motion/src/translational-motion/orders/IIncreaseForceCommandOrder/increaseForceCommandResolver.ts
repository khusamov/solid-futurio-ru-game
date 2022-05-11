import {IUniversalObject} from 'khusamov-universal-object';
import {resolve} from 'khusamov-inversion-of-control';
import {NotFoundTargetObjectError} from 'khusamov-command-order-system';
import IncreaseForceCommandOrderAdapter from './IncreaseForceCommandOrderAdapter';
import IncreaseForceCommand from '../../IncreaseForceCommand';
import MovableAdapter from '../../../MovableAdapter';

export default function increaseForceCommandResolver(increaseForceCommandOrderObject: IUniversalObject) {
	const increaseForceCommandOrder = new IncreaseForceCommandOrderAdapter(increaseForceCommandOrderObject)

	const targetObject = resolve<IUniversalObject | undefined>(...increaseForceCommandOrder.targetObject)

	if (!targetObject) {
		throw new NotFoundTargetObjectError(increaseForceCommandOrder.targetObject)
	}

	return (
		new IncreaseForceCommand(
			new MovableAdapter(targetObject),
			increaseForceCommandOrder.increment
		)
	)
}