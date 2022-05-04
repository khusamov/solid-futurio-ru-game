import {IOrder, StopCommand} from 'khusamov-command-system';
import {TTargetObjectSearchParams} from './IStartMoveTransformOrder';
import {IUniversalObject} from 'khusamov-universal-object';
import {resolve} from 'khusamov-inversion-of-control';
import {ICommand, IQueue} from 'khusamov-base-types';
import {EventEmitter} from 'events';
import {TGameObjectList} from '../types';

/**
 * Демонстрационный приказ.
 * Приказ на уничтожение игрового объекта.
 */
export default interface IDestroyOrder extends IOrder {
	type: 'Destroy'
	targetObject: TTargetObjectSearchParams
}

export class DestroyOrderAdapter implements IDestroyOrder {
	public readonly type = 'Destroy'
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

export function destroyCommandResolver(destroyOrderObject: IUniversalObject): ICommand {
	const destroyOrder = new DestroyOrderAdapter(destroyOrderObject)

	const targetObject = (
		resolve<IUniversalObject | undefined>(
			destroyOrder.targetObject.type,
			destroyOrder.targetObject
		)
	)
	if (!targetObject) {
		throw new Error(`Целевой объект не найден '${JSON.stringify(destroyOrder.targetObject)}'`)
	}

	return new DestroyCommand(targetObject)
}

class DestroyCommand implements ICommand {
	public readonly name: string = 'DestroyCommand'
	public commandQueue?: IQueue<ICommand>

	constructor(
		private targetObject: IUniversalObject
	) {}

	public execute(): void {
		const commandQueue = this.commandQueue
		if (!commandQueue) {
			throw new Error('Не найдена очередь команд')
		}
		const stopCommand = new StopCommand(this.targetObject)

		const commandQueueEventEmitter = resolve<EventEmitter>('CommandQueue.EventEmitter')

		// Создать обработчик события execute.
		// Это нужно, чтобы отследить момент, когда команда stopCommand остановила
		// все команды целевого объекта. Так как только после этого можно удалить сам целевой объект.
		const onStopCommandExecute = (command: ICommand) => {
			if (command === stopCommand) {
				// Удаление обработчика события execute.
				commandQueueEventEmitter.removeListener('execute', onStopCommandExecute)
				// Удаление целевого объекта.
				const gameObjectList = resolve<TGameObjectList>('GameObjectList')
				const targetObjectIndex = gameObjectList.indexOf(this.targetObject)
				if (targetObjectIndex === -1) {
					throw new Error(`Целевой объект не найден '${JSON.stringify(this.targetObject)}'`)
				}
				gameObjectList.splice(targetObjectIndex, 1)
			}
		}
		commandQueueEventEmitter.on('execute', onStopCommandExecute)

		// Размещение команды stopCommand в очередеь команд.
		commandQueue.enqueue(stopCommand)
	}
}