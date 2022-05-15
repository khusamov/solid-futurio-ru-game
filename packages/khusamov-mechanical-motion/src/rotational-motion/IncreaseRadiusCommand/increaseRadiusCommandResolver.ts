import {IIncreaseRadiusCommandOrder} from './IIncreaseRadiusCommandOrder';
import {resolve} from 'khusamov-inversion-of-control';
import {IUniversalObject} from 'khusamov-universal-object';
import {NotFoundTargetObjectError} from 'khusamov-command-system';
import {IncreaseRadiusCommand} from './IncreaseRadiusCommand';
import {RotableAdapter} from '../../interfaces';

export function increaseRadiusCommandResolver(increaseRadiusCommandOrder: IIncreaseRadiusCommandOrder) {
	const targetObject = resolve<IUniversalObject | undefined>(...increaseRadiusCommandOrder.targetObject)

	if (!targetObject) {
		throw new NotFoundTargetObjectError(increaseRadiusCommandOrder.targetObject)
	}

	return (
		new IncreaseRadiusCommand(
			new RotableAdapter(targetObject),
			increaseRadiusCommandOrder.increment
		)
	)
}