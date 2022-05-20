import {IUpdateCobraSpaceshipCommandOrder} from './IUpdateCobraSpaceshipCommandOrder';
import {ICommand, NotFoundTargetObjectError} from 'khusamov-command-system';
import {resolve} from 'khusamov-inversion-of-control';
import {createAdapter, IUniversalObject} from 'khusamov-universal-object';
import {UpdateCobraSpaceshipCommand} from './UpdateCobraSpaceshipCommand';
import {CobraSpaceshipAdapter} from '../../../interfaces';
import {MovableAdapter, RigidBodyAdapter, RotableAdapter, TransformableAdapter} from 'khusamov-mechanical-motion';

export function updateCobraSpaceshipCommandResolver(updateCobraSpaceshipCommandOrder: IUpdateCobraSpaceshipCommandOrder): ICommand {
	const targetObject = resolve<IUniversalObject | undefined>(...updateCobraSpaceshipCommandOrder.targetObject)

	if (!targetObject) {
		throw new NotFoundTargetObjectError(updateCobraSpaceshipCommandOrder.targetObject)
	}

	return new UpdateCobraSpaceshipCommand(
		createAdapter(
			targetObject,
			CobraSpaceshipAdapter,
			MovableAdapter,
			RotableAdapter,
			RigidBodyAdapter,
			TransformableAdapter
		)
	)
}