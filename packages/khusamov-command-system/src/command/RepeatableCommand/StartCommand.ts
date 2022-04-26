import {reflect} from 'typescript-rtti';
import {ICommand, IQueue, IUniversalObject} from 'khusamov-base-types';
import {IoC, resolve} from 'khusamov-inversion-of-control';
import IObjectWithStoppable from './IObjectWithStoppable';
import RepeatableCommand from './RepeatableCommand';

/**
 * Запуск длительной команды.
 */
export default class StartCommand implements ICommand {
	public commandQueue?: IQueue<ICommand>
	private readonly repeatableCommand: RepeatableCommand

	get name(): string {
		return 'StartCommand: ' + this.targetCommand.name
	}

	/**
	 * Конструктор.
	 * @param targetCommand Запускаемая команда, которую можно в будущем остановить.
	 * @param targetCommandName Имя запускаемой команды, по которому можно в будущем остановить.
	 * @param targetObject Объект, для которого требуется запуск определенной команды.
	 * @param args
	 */
	constructor(
		// TODO Изменить порядок аргументов на targetObject targetCommandName targetCommand
		//  targetCommand обязательно поселдней сделать
		private targetCommand: ICommand,
		private targetCommandName: string,
		private targetObject: IUniversalObject,
		...args: Array<any>
	) {
		this.repeatableCommand = new RepeatableCommand(targetCommand)
	}

	public execute(): void {
		// Проверка добавляемой команды.
		if (this.stoppableCommandMap.has(this.targetCommandName)) {
			throw new Error(`Попытка запустить повторно длительную команду '${this.targetCommandName}'`)
		}
		if (this.commandQueue) {
			// Размещение повторяемой команды в очереди команд.
			this.commandQueue.enqueue(this.repeatableCommand)
			// Сохранение ссылки на повторяемую команду, чтобы была возможность ее остановить по ссылке.
			this.stoppableCommandMap.set(this.targetCommandName, this.repeatableCommand)
		}
	}

	private get stoppableCommandMap() {
		const withStoppable = IoC.resolve<IObjectWithStoppable>('Adapter', this.targetObject, reflect<IObjectWithStoppable>())
		if (!withStoppable.stoppableCommandMap) {
			withStoppable.stoppableCommandMap = new Map
		}
		return withStoppable.stoppableCommandMap
	}
}