import {ICommand, NotFoundTargetObjectError} from 'khusamov-command-system';
import {IControlCobraSpaceshipCommandOrder} from './IControlCobraSpaceshipCommandOrder';
import {resolve} from 'khusamov-inversion-of-control';
import {createAdapter, IUniversalObject} from 'khusamov-universal-object';
import {ControlCobraSpaceshipCommand} from './ControlCobraSpaceshipCommand';
import {CobraSpaceshipAdapter} from '../../../interfaces';
import {MovableAdapter, RigidBodyAdapter, RotableAdapter, TransformableAdapter} from 'khusamov-mechanical-motion';

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