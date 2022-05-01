import {ICommand} from 'khusamov-base-types';
import {resolve} from 'khusamov-inversion-of-control';
import {IOrder, RepeatableCommand, StartCommand} from 'khusamov-command-system';
import {IMovable, MoveTransformCommand, TMoveTransformAction} from 'khusamov-mechanical-motion';
import {UniversalObjectAdapter} from 'khusamov-universal-object';

export default interface IMoveTransformOrder extends IOrder {
	type: 'StartMoveTransform'
	transform: string
	target: {
		type: string
		name: string
	}
}

export function startMoveTransformCommandResolver(order: IMoveTransformOrder): ICommand {
	const target = resolve<IMovable | undefined>(order.target.type, order.target)
	if (!target) {
		throw new Error(`Целевой объект не найден '${JSON.stringify(order.target)}'`)
	}
	return (
		new StartCommand(
			order.transform,
			// TODO Избавиться от использования класса UniversalObjectAdapter
			new UniversalObjectAdapter(target),
			new RepeatableCommand(
				new MoveTransformCommand(
					target,
					resolve<TMoveTransformAction>(order.transform)
				)
			)
		)
	)
}

