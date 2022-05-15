import {createAdapter, IUniversalObject} from 'khusamov-universal-object';
import {resolve} from 'khusamov-inversion-of-control';
import {ICommand, NotFoundTargetObjectError} from 'khusamov-command-system';
import {MovableAdapter, TransformableAdapter} from '../../interfaces';
import {IMoveCommandOrder} from './IMoveCommandOrder';
import {MoveCommand} from './MoveCommand';

export function moveCommandResolver(moveCommandOrder: IMoveCommandOrder): ICommand {
	const targetObject = resolve<IUniversalObject | undefined>(...moveCommandOrder.targetObject)

	if (!targetObject) {
		throw new NotFoundTargetObjectError(moveCommandOrder.targetObject)
	}

	return new MoveCommand(createAdapter(targetObject, TransformableAdapter, MovableAdapter))
}