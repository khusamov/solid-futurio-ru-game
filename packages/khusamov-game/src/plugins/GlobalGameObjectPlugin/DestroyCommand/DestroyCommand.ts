import {EventEmitter} from 'events';
import {IQueue} from 'khusamov-base-types';
import {IUniversalObject} from 'khusamov-universal-object';
import {resolve} from 'khusamov-inversion-of-control';
import {ICommand, StopCommand} from 'khusamov-command-system';
import {TGameObjectList} from '../types';

export class DestroyCommand implements ICommand {
	public commandQueue?: IQueue<ICommand>

	public constructor(
		private targetObject: IUniversalObject
	) {}

	public execute(): void {
		const commandQueue = this.commandQueue
		if (!commandQueue) {
			throw new Error('Не найдена очередь команд')
		}
		const stopCommand = new StopCommand(this.targetObject)

		// Создать обработчик события execute.
		// Это нужно, чтобы отследить момент, когда команда stopCommand остановила
		// все команды целевого объекта. Так как только после этого можно удалить сам целевой объект.
		const commandQueueEventEmitter = resolve<EventEmitter>('CommandQueue.EventEmitter')
		const onStopCommandExecute = (
			(command: ICommand) => {
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
		)
		commandQueueEventEmitter.on('execute', onStopCommandExecute)

		// Размещение команды stopCommand в очереди команд.
		commandQueue.enqueue(stopCommand)
	}
}