import {IOrder, StopCommand} from 'khusamov-command-system';
import {ICommand} from 'khusamov-base-types';
import {resolve} from 'khusamov-inversion-of-control';
import {IUniversalObject} from 'khusamov-universal-object';
import {TTargetObjectSearchParams} from './IStartMoveTransformOrder';

export default interface IStopOrder extends IOrder {
	type: 'Stop'
	command: string
	targetObject: TTargetObjectSearchParams
}

export function stopCommandResolver(order: IStopOrder): ICommand {
	const target = resolve<IUniversalObject | undefined>(order.targetObject.type, order.targetObject)
	if (!target) {
		throw new Error(`Целевой объект не найден '${JSON.stringify(order.targetObject)}'`)
	}

	return new StopCommand(order.command, target)
}