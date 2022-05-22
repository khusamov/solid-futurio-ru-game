import {ICommand, NotFoundTargetObjectError} from 'khusamov-command-system';
import {IControlCobraSpaceshipCommandOrder} from './IControlCobraSpaceshipCommandOrder';
import {resolve} from 'khusamov-inversion-of-control';
import {createAdapter, IUniversalObject} from 'khusamov-universal-object';
import {ControlCobraSpaceshipCommand} from './ControlCobraSpaceshipCommand';
import {MovableAdapter, RigidBodyAdapter, RotableAdapter, TransformableAdapter} from 'khusamov-mechanical-motion';
import {CobraSpaceshipAdapter} from '../ICobraSpaceship/CobraSpaceshipAdapter';

export function controlCobraSpaceshipCommandResolver(controlCobraSpaceshipCommandOrder: IControlCobraSpaceshipCommandOrder): ICommand {
	const targetObject = resolve<IUniversalObject | undefined>(...controlCobraSpaceshipCommandOrder.targetObject)

	if (!targetObject) {
		throw new NotFoundTargetObjectError(controlCobraSpaceshipCommandOrder.targetObject)
	}

	return new ControlCobraSpaceshipCommand(
		createAdapter(
			targetObject,
			CobraSpaceshipAdapter,
			MovableAdapter,
			RotableAdapter,
			RigidBodyAdapter,
			TransformableAdapter
		),
		controlCobraSpaceshipCommandOrder.engine,
		controlCobraSpaceshipCommandOrder.increment
	)
}