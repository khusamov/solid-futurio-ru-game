import {ICommand} from 'khusamov-base-types';
import {UniversalObjectAdapter} from 'khusamov-universal-object';
import {resolve} from 'khusamov-inversion-of-control';
import {IOrder, RepeatableCommand, StartCommand} from 'khusamov-command-system';
import {
	clockwiseRotateForceActionResolver,
	counterclockwiseRotateForceActionResolver,
	decreaseForceActionResolver,
	IMovable,
	increaseForceActionResolver,
	MoveTransformCommand,
	TMoveTransformAction,
	toroidalTransformActionResolver
} from 'khusamov-mechanical-motion';

export type TTransformActionParams = (
	['IncreaseForce', ...Parameters<typeof increaseForceActionResolver>] |
	['DecreaseForce', ...Parameters<typeof decreaseForceActionResolver>] |
	['ClockwiseRotateForce', ...Parameters<typeof clockwiseRotateForceActionResolver>] |
	['CounterclockwiseRotateForce', ...Parameters<typeof counterclockwiseRotateForceActionResolver>] |
	['ToroidalPositionTransformation', ...Parameters<typeof toroidalTransformActionResolver>]
)

export type TTargetObjectSearchParams = {
	type: string
	name: string
}

export default interface IMoveTransformOrder extends IOrder {
	type: 'StartMoveTransform'
	transformAction: TTransformActionParams
	targetObject: TTargetObjectSearchParams
}

export function startMoveTransformCommandResolver(order: IMoveTransformOrder): ICommand {
	const targetObject = resolve<IMovable | undefined>(order.targetObject.type, order.targetObject)
	if (!targetObject) {
		throw new Error(`Целевой объект не найден '${JSON.stringify(order.targetObject)}'`)
	}

	const [transformName, ...transformParams] = order.transformAction
	const transformNamePrefix = 'MoveTransformAction.'

	return (
		new StartCommand(
			transformNamePrefix + transformName,
			// TODO Избавиться от использования класса UniversalObjectAdapter
			new UniversalObjectAdapter(targetObject),
			new RepeatableCommand(
				new MoveTransformCommand(
					targetObject,
					resolve<TMoveTransformAction>(
						transformNamePrefix + transformName,
						...transformParams
					)
				)
			)
		)
	)
}

