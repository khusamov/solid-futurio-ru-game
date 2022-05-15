import {IUniversalObject} from 'khusamov-universal-object';
import {resolve} from 'khusamov-inversion-of-control';
import {NotFoundTargetObjectError} from 'khusamov-command-system';
import {MovableAdapter} from '../../interfaces';
import {IncreaseForceCommand} from './IncreaseForceCommand';
import {IIncreaseForceCommandOrder} from './IIncreaseForceCommandOrder';

export function increaseForceCommandResolver(increaseForceCommandOrder: IIncreaseForceCommandOrder) {
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