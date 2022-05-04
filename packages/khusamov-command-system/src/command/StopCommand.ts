import {ICommand, IStoppable, IWithStoppable} from 'khusamov-base-types';
import {isUniversalObject, IUniversalObject} from 'khusamov-universal-object';
import commandFullName from '../functions/commandFullName';
import WithStoppableAdapter from '../adapter/WithStoppableAdapter';

/**
 * Остановка команды, которую можно остановить.
 */
export default class StopCommand implements ICommand {
	private readonly stoppableCommandName: string | undefined
	private readonly targetObject: IUniversalObject

	public get name(): string {
		return 'StopCommand: ' + this.stoppableCommandFullName
	}

	private get stoppableCommandFullName(): string {
		return commandFullName(this.stoppableCommandName || 'All', this.stoppableCommand)
	}

	private get stoppableCommand(): ICommand & IStoppable | undefined {
		return this.stoppableCommandName ? this.withStoppable.stoppableMap?.get(this.stoppableCommandName) : undefined
	}

	private get withStoppable() {
		return new WithStoppableAdapter(this.targetObject) as IWithStoppable<ICommand & IStoppable>
		//return resolve<IWithStoppable>('Adapter', this.targetObject, reflect<IWithStoppable>()) as IWithStoppable<ICommand & IStoppable>
	}

	/**
	 * Конструктор команды Стоп. Останавливаются все команды.
	 * @param targetObject Объект, в котором будет производится поиск ссылки на команду.
	 */
	public constructor(targetObject: IUniversalObject)

	/**
	 * Конструктор команды Стоп. Останавливается определенная команда
	 * @param stoppableCommandName Имя команды, которую надо остановить.
	 * @param targetObject Объект, в котором будет производится поиск ссылки на команду.
	 */
	public constructor(stoppableCommandName: string, targetObject: IUniversalObject)

	public constructor(
		stoppableCommandNameOrTargetObject: string | IUniversalObject,
		targetObject?: IUniversalObject
	) {
		if (arguments.length === 1 && isUniversalObject(stoppableCommandNameOrTargetObject)) {
			this.stoppableCommandName = undefined
			this.targetObject = stoppableCommandNameOrTargetObject
		} else if (typeof stoppableCommandNameOrTargetObject === 'string' && isUniversalObject(targetObject)) {
			this.stoppableCommandName = stoppableCommandNameOrTargetObject
			this.targetObject = targetObject
		} else {
			throw new Error('Задана неправильные параметры')
		}
	}

	public execute(): void {
		const stoppableCommandName = this.stoppableCommandName
		const stoppableCommand = this.stoppableCommand
		const stoppableMap = this.withStoppable.stoppableMap

		if (!stoppableMap) {
			throw new Error('Не найдена карта останавливаемых команд')
		}

		if (stoppableCommandName) {
			// Останавливается одна определенная команда.
			if (!stoppableMap.has(stoppableCommandName) || !stoppableCommand) {
				throw new Error(`Не найдена команда '${stoppableCommandName}'`)
			}

			stoppableCommand.stop()
			stoppableMap.delete(stoppableCommandName)
		} else {
			// Останавливаются все команды.
			for (const [stoppableCommandName, stoppableCommand] of stoppableMap.entries()) {
				stoppableCommand.stop()
				stoppableMap.delete(stoppableCommandName)
			}
		}
	}
}