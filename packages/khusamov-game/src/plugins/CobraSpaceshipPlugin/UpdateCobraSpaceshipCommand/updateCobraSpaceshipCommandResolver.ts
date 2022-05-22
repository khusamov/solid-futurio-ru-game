import {IUpdateCobraSpaceshipCommandOrder} from './IUpdateCobraSpaceshipCommandOrder';
import {ICommand, NotFoundTargetObjectError} from 'khusamov-command-system';
import {resolve} from 'khusamov-inversion-of-control';
import {createAdapter, IUniversalObject} from 'khusamov-universal-object';
import {UpdateCobraSpaceshipCommand} from './UpdateCobraSpaceshipCommand';
import {MovableAdapter, RigidBodyAdapter, RotableAdapter, TransformableAdapter} from 'khusamov-mechanical-motion';
import {CobraSpaceshipAdapter} from '../ICobraSpaceship/CobraSpaceshipAdapter';

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