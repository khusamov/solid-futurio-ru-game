import {IQueue, IStoppable} from 'khusamov-base-types';
import {IUniversalObject} from 'khusamov-universal-object';
import {ICommand, WithStoppableAdapter} from '../../interfaces';

/**
 * Запуск команды, которую можно остановить.
 */
export class StartCommand implements ICommand {
	public commandQueue?: IQueue<ICommand>

	/**
	 * Конструктор.
	 * @param stoppableCommandName Уникальное в рамках targetObject имя команды.
	 * @param targetObject Объект, в котором будет хранится ссылка на команду.
	 * @param stoppableCommand Команда, которую можно остановить.
	 */
	public constructor(
		private readonly stoppableCommandName: string,
		private readonly targetObject: IUniversalObject,
		private readonly stoppableCommand: ICommand & IStoppable
	) {}

	public execute(): void {
		if (this.stoppableCommandMap.has(this.stoppableCommandName)) {
			throw new Error(`StartCommand: Попытка запустить повторно команду '${this.stoppableCommandName}'`)
		}
		if (!this.commandQueue) {
			throw new Error(`StartCommand: Не найдена очередь команд для добавления в нее команды '${this.stoppableCommandName}'`)
		}

		this.commandQueue.enqueue(this.stoppableCommand)
		// Сохранение ссылки на команду, чтобы была возможность ее остановить по ссылке.
		this.stoppableCommandMap.set(this.stoppableCommandName, this.stoppableCommand)
	}

	private get stoppableCommandMap() {
		const withStoppable = new WithStoppableAdapter(this.targetObject)

		if (!withStoppable.stoppableMap) {
			withStoppable.stoppableMap = new Map
		}
		return withStoppable.stoppableMap
	}
}