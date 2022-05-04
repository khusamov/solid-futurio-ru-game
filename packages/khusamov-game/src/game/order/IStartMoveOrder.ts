import {IOrder, RepeatableCommand, StartCommand} from 'khusamov-command-system';
import {MovableAdapter, MoveCommand} from 'khusamov-mechanical-motion';
import {ICommand} from 'khusamov-base-types';
import {IUniversalObject} from 'khusamov-universal-object';
import {TTargetObjectSearchParams} from './IStartMoveTransformOrder';
import {resolve} from 'khusamov-inversion-of-control';

export default interface IStartMoveOrder extends IOrder {
	type: 'StartMove',
	targetObject: TTargetObjectSearchParams
}

export function startMoveCommandResolver(order: IStartMoveOrder): ICommand {
	const targetObject = resolve<IUniversalObject | undefined>(order.targetObject.type, order.targetObject)
	if (!targetObject) {
		throw new Error(`Целевой объект не найден '${JSON.stringify(order.targetObject)}'`)
	}

	return (
		new StartCommand(
			'MoveCommand',
			targetObject,
			new RepeatableCommand(new MoveCommand(new MovableAdapter(targetObject)))
		)
	)
}