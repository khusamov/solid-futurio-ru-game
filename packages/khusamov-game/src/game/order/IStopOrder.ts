import {IOrder, StopCommand} from 'khusamov-command-system';
import {ICommand} from 'khusamov-base-types';
import {resolve} from 'khusamov-inversion-of-control';
import {IUniversalObject} from 'khusamov-universal-object';
import {TTargetObjectSearchParams} from './IStartMoveTransformOrder';

export default interface IStopOrder extends IOrder {
	type: 'Stop'
	targetObject: TTargetObjectSearchParams

	/**
	 * Идентификатор останавливаемой команды.
	 * Если команда не указана, то будут остановлены все команды для целевого объекта.
	 */
	command?: string
}

export class StopOrderAdapter implements IStopOrder {
	public readonly type = 'Stop'
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

	public get command(): string | undefined {
		return this.universalObject.getValue('command')
	}

	public set command(value: string | undefined) {
		this.universalObject.setValue('command', value)
	}
}

export function stopCommandResolver(stopOrderObject: IUniversalObject): ICommand {
	const stopOrder = new StopOrderAdapter(stopOrderObject)

	const targetObject = (
		resolve<IUniversalObject | undefined>(
			stopOrder.targetObject.type,
			stopOrder.targetObject
		)
	)
	if (!targetObject) {
		throw new Error(`Целевой объект не найден '${JSON.stringify(stopOrder.targetObject)}'`)
	}

	return (
		stopOrder.command
			? new StopCommand(stopOrder.command, targetObject)
			: new StopCommand(targetObject)
	)
}