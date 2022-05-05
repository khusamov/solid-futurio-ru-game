import {IOrder, RepeatableCommand, StartCommand} from 'khusamov-command-system';
import {MovableAdapter, MoveCommand} from 'khusamov-mechanical-motion';
import {ICommand} from 'khusamov-base-types';
import {IUniversalObject} from 'khusamov-universal-object';
import {TTargetObjectSearchParams} from './IStartMoveTransformOrder';
import {resolve} from 'khusamov-inversion-of-control';

// TODO IStartMoveOrder надо заменить на IStarOrder
// Чтобы вместо этого:
// type: 'StartMoveTransform',
// 	transformAction: 'IncreaseForce',
// 	targetObject: {
// 	type: 'GameObject',
// 		name: targetObjectName
// }
// Стало это:
// type: 'Start',
// 	command: 'MoveTransform.IncreaseForce',
// 	targetObject: {
// 	type: 'GameObject',
// 		name: targetObjectName
// }
// А то приказы старт стоп сейчас не соответствуют друг другу

export default interface IStartMoveOrder extends IOrder {
	type: 'StartMove',
	targetObject: TTargetObjectSearchParams
}

export class StartMoveOrderAdapter implements IStartMoveOrder {
	public readonly type = 'StartMove'
	public constructor(private universalObject: IUniversalObject) {}

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

export function startMoveCommandResolver(startMoveOrderObject: IUniversalObject): ICommand {
	const startMoveOrder = new StartMoveOrderAdapter(startMoveOrderObject)

	const targetObject = (
		resolve<IUniversalObject | undefined>(
			startMoveOrder.targetObject.type,
			startMoveOrder.targetObject
		)
	)
	if (!targetObject) {
		throw new Error(`Целевой объект не найден '${JSON.stringify(startMoveOrder.targetObject)}'`)
	}

	return (
		new StartCommand(
			'MoveCommand',
			targetObject,
			new RepeatableCommand(new MoveCommand(new MovableAdapter(targetObject)))
		)
	)
}