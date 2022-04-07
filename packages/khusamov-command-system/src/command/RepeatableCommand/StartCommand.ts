import {reflect} from 'typescript-rtti';
import {ICommand, IQueue, IUniversalObject} from 'khusamov-base-types';
import {IoC} from 'khusamov-inversion-of-control';
import IObjectWithStoppable from './IObjectWithStoppable';
import RepeatableCommand from './RepeatableCommand';

/**
 * Запуск длительной команды.
 */
export default class StartCommand implements ICommand {
	/**
	 * Конструктор.
	 * @param targetObject Объект, для которого требуется запуск определенной команды.
	 * @param targetCommand Команда, которую надо запустить и в будущем по имени остановить.
	 * @param stoppableCommandName Имя запускаемой команды, по которому можно в будущем остановить.
	 */
	constructor(
		private targetObject: IUniversalObject,
		private targetCommand: ICommand,
		private stoppableCommandName: string
	) {}

	public execute(): void {
		const repeatableCommand = new RepeatableCommand(this.targetCommand)

		const commandQueue = IoC.resolve<IQueue<ICommand>>('CommandQueue')
		commandQueue.enqueue(repeatableCommand)

		this.stoppableCommandMap.set(this.stoppableCommandName, repeatableCommand)
	}

	private get stoppableCommandMap() {
		const withStoppable = IoC.resolve<IObjectWithStoppable>('Adapter', this.targetObject, reflect<IObjectWithStoppable>())
		if (!withStoppable.stoppableCommandMap) {
			withStoppable.stoppableCommandMap = new Map
		}
		return withStoppable.stoppableCommandMap
	}
}