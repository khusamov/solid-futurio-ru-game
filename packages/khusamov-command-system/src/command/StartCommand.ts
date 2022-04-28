import {reflect} from 'typescript-rtti';
import {ICommand, IQueue, IStoppable, IUniversalObject, IWithStoppable} from 'khusamov-base-types';
import {resolve} from 'khusamov-inversion-of-control';
import commandFullName from '../functions/commandFullName';
import WithStoppableAdapter from '../adapter/WithStoppableAdapter';

/**
 * Запуск команды, которую можно остановить.
 */
export default class StartCommand implements ICommand {
	public commandQueue?: IQueue<ICommand>

	public get name(): string {
		return 'StartCommand: ' + this.stoppableCommandFullName
	}

	/**
	 * Конструктор.
	 * @param stoppableCommandName Уникальное в рамках targetObject имя команды.
	 * @param targetObject Объект, в котором будет хранится ссылка на команду.
	 * @param stoppableCommand Команда, которую можно остановить.
	 */
	public constructor(
		private readonly stoppableCommandName: string,
		private readonly targetObject: IUniversalObject,
		private stoppableCommand: ICommand & IStoppable
	) {}

	public execute(): void {
		if (this.stoppableCommandMap.has(this.stoppableCommandName)) {
			throw new Error(`StartCommand: Попытка запустить повторно команду '${this.stoppableCommandFullName}'`)
		}
		if (!this.commandQueue) {
			throw new Error(`StartCommand: Не найдена очередь команд для добавления в нее команды '${this.stoppableCommandFullName}'`)
		}

		this.commandQueue.enqueue(this.stoppableCommand)
		// Сохранение ссылки на команду, чтобы была возможность ее остановить по ссылке.
		this.stoppableCommandMap.set(this.stoppableCommandName, this.stoppableCommand)
	}

	private get stoppableCommandMap() {

		// https://github.com/typescript-rtti/typescript-rtti/issues/59
		// Пока с адаптерами проблемы. Сложные адаптеры похоже не создать при помощи typescript-rtti.
		// const withStoppable = resolve<IWithStoppable>('Adapter', this.targetObject, reflect<IWithStoppable>())
		const withStoppable = new WithStoppableAdapter(this.targetObject)

		if (!withStoppable.stoppableMap) {
			withStoppable.stoppableMap = new Map
		}
		return withStoppable.stoppableMap
	}

	private get stoppableCommandFullName(): string {
		return commandFullName(this.stoppableCommandName, this.stoppableCommand)
	}
}