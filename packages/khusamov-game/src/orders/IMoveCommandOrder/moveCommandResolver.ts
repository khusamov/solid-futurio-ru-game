import {IUniversalObject} from 'khusamov-universal-object';
import {ICommand} from 'khusamov-base-types';
import MoveCommandOrderAdapter from './MoveCommandOrderAdapter';
import {resolve} from 'khusamov-inversion-of-control';
import {MovableAdapter, MoveCommand} from 'khusamov-mechanical-motion';
import {NotFoundTargetObjectError} from 'khusamov-command-order-system';

export default function moveCommandResolver(moveCommandOrderObject: IUniversalObject): ICommand {
	const moveCommandOrder = new MoveCommandOrderAdapter(moveCommandOrderObject)

	const targetObject = resolve<IUniversalObject | undefined>(...moveCommandOrder.targetObject)

	if (!targetObject) {
		throw new NotFoundTargetObjectError(moveCommandOrder.targetObject)
	}

	return new MoveCommand(new MovableAdapter(targetObject))
}