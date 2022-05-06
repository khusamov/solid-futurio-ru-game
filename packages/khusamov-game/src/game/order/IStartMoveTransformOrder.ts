import {ICommand} from 'khusamov-base-types';
import {IUniversalObject} from 'khusamov-universal-object';
import {resolve} from 'khusamov-inversion-of-control';
import {IOrder, RelayCommand, RepeatableCommand, StartCommand} from 'khusamov-command-system';
import {
	clockwiseRotateForceActionResolver,
	counterclockwiseRotateForceActionResolver,
	decreaseForceActionResolver,
	increaseForceActionResolver,
	toroidalTransformActionResolver,
	MovableAdapter,
	TMoveTransformAction
} from 'khusamov-mechanical-motion';

export type TTransformActionParams = (
	['IncreaseForce', ...Parameters<typeof increaseForceActionResolver>] |
	['DecreaseForce', ...Parameters<typeof decreaseForceActionResolver>] |
	['ClockwiseRotateForce', ...Parameters<typeof clockwiseRotateForceActionResolver>] |
	['CounterclockwiseRotateForce', ...Parameters<typeof counterclockwiseRotateForceActionResolver>] |
	['ToroidalPositionTransformation', ...Parameters<typeof toroidalTransformActionResolver>] |
	['UnknownTransformAction']
)

export type TTargetObjectSearchParams = {
	type: string
	name: string
}

export default interface IStartMoveTransformOrder extends IOrder {
	type: 'StartMoveTransform'
	transformAction: TTransformActionParams
	targetObject: TTargetObjectSearchParams
}

class StartMoveTransformOrderAdapter implements IStartMoveTransformOrder {
	public readonly type = 'StartMoveTransform'
	public constructor(private universalObject: IUniversalObject) {}

	public get transformAction(): TTransformActionParams {
		return this.universalObject.getValue('transformAction', ['UnknownTransformAction'])
	}

	public set transformAction(value: TTransformActionParams) {
		this.universalObject.setValue('transformAction', value)
	}

	public get targetObject(): TTargetObjectSearchParams {
		return this.universalObject.getValue('targetObject', {
			type: '',
			name: ''
		})
	}

	public set targetObject(value: TTargetObjectSearchParams) {
		this.universalObject.setValue('targetObject', value)
	}
}

export function startMoveTransformCommandResolver(startMoveTransformOrderObject: IUniversalObject): ICommand {
	const startMoveTransformOrder = new StartMoveTransformOrderAdapter(startMoveTransformOrderObject)
	const targetObject = (
		resolve<IUniversalObject | undefined>(
			startMoveTransformOrder.targetObject.type,
			startMoveTransformOrder.targetObject
		)
	)
	if (!targetObject) {
		throw new Error(`Целевой объект не найден '${JSON.stringify(startMoveTransformOrder.targetObject)}'`)
	}

	const [transformName, ...transformParams] = startMoveTransformOrder.transformAction

	return (
		new StartCommand(
			'MoveTransform.' + transformName,
			targetObject,
			new RepeatableCommand(
				new RelayCommand(
					'MoveTransformAction.' + transformName,
					() => {
						const transform = (
							resolve<TMoveTransformAction>(
								'MoveTransformAction.' + transformName,
								...transformParams
							)
						)
						transform(new MovableAdapter(targetObject))
					}
				)
			)
		)
	)
}

