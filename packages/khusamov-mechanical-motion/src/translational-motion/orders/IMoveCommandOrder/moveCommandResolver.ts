import {ICommand} from 'khusamov-base-types';
import {IUniversalObject} from 'khusamov-universal-object';
import {resolve} from 'khusamov-inversion-of-control';
import {NotFoundTargetObjectError} from 'khusamov-command-order-system';
import MovableAdapter from '../../../MovableAdapter';
import MoveCommand from '../../MoveCommand';
import MoveCommandOrderAdapter from './MoveCommandOrderAdapter';

export default function moveCommandResolver(moveCommandOrderObject: IUniversalObject): ICommand {
	const moveCommandOrder = new MoveCommandOrderAdapter(moveCommandOrderObject)

	const targetObject = resolve<IUniversalObject | undefined>(...moveCommandOrder.targetObject)

	if (!targetObject) {
		throw new NotFoundTargetObjectError(moveCommandOrder.targetObject)
	}

	return new MoveCommand(new MovableAdapter(targetObject))
}