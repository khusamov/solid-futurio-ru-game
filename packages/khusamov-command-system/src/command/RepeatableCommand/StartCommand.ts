import {ICommand, IQueue, IStoppable, IUniversalObject} from 'khusamov-base-types';
import {IoC} from 'khusamov-inversion-of-control';
import IObjectWithStoppable from './IObjectWithStoppable';
import {reflect} from 'typescript-rtti';

/**
 * Запуск длительной команды.
 */
export default class StartCommand implements ICommand {
	/**
	 * Конструктор.
	 * @param targetObject Объект, для которого требуется запуск определенной команды.
	 * @param stoppableCommand Команда, которую надо запустить и в будущем по имени остановить.
	 * @param stoppableCommandName Имя запускаемой команды, по которому можно в будущем остановить.
	 */
	constructor(
		private targetObject: IUniversalObject<any>,
		private stoppableCommand: IStoppable & ICommand,
		private stoppableCommandName: string
	) {}

	public execute(): void {
		const commandQueue = IoC.resolve<IQueue<ICommand>>('CommandQueue')
		commandQueue.enqueue(this.stoppableCommand)

		this.stoppableCommandMap.set(this.stoppableCommandName, this.stoppableCommand)
	}

	private get stoppableCommandMap() {
		const withStoppable = IoC.resolve<IObjectWithStoppable>('Adapter', this.targetObject, reflect<IObjectWithStoppable>())
		if (!withStoppable.stoppableCommandMap) {
			withStoppable.stoppableCommandMap = new Map
		}
		return withStoppable.stoppableCommandMap
	}
}