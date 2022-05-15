import {IIncreaseRadiusCommandOrder} from './IIncreaseRadiusCommandOrder';
import {resolve} from 'khusamov-inversion-of-control';
import {createAdapter, IUniversalObject} from 'khusamov-universal-object';
import {NotFoundTargetObjectError} from 'khusamov-command-system';
import {IncreaseRadiusCommand} from './IncreaseRadiusCommand';
import {RigidBodyAdapter, RotableAdapter} from '../../interfaces';

export function increaseRadiusCommandResolver(increaseRadiusCommandOrder: IIncreaseRadiusCommandOrder) {
	const targetObject = resolve<IUniversalObject | undefined>(...increaseRadiusCommandOrder.targetObject)

	if (!targetObject) {
		throw new NotFoundTargetObjectError(increaseRadiusCommandOrder.targetObject)
	}

	return (
		new IncreaseRadiusCommand(
			createAdapter(targetObject, RigidBodyAdapter, RotableAdapter),
			increaseRadiusCommandOrder.increment
		)
	)
}