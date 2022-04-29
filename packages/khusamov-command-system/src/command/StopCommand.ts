import {reflect} from 'typescript-rtti';
import {ICommand, IStoppable, IWithStoppable} from 'khusamov-base-types';
import {IUniversalObject} from 'khusamov-universal-object';
import {resolve} from 'khusamov-inversion-of-control';
import commandFullName from '../functions/commandFullName';
import WithStoppableAdapter from '../adapter/WithStoppableAdapter';

/**
 * Остановка команды, которую можно остановить.
 */
export default class StopCommand implements ICommand {
	public get name(): string {
		return 'StopCommand: ' + this.stoppableCommandFullName
	}

	private get stoppableCommand(): ICommand & IStoppable | undefined {
		return this.withStoppable.stoppableMap?.get(this.stoppableCommandName)
	}

	private get withStoppable() {
		return new WithStoppableAdapter(this.targetObject) as IWithStoppable<ICommand & IStoppable>
		//return resolve<IWithStoppable>('Adapter', this.targetObject, reflect<IWithStoppable>()) as IWithStoppable<ICommand & IStoppable>
	}

	/**
	 * Конструктор.
	 * @param stoppableCommandName Имя команды, которую надо остановить.
	 * @param targetObject Объект, в котором будет производится поиск ссылки на команду.
	 */
	public constructor(
		private stoppableCommandName: string,
		private targetObject: IUniversalObject
	) {}

	public execute(): void {
		const stoppableCommandName = this.stoppableCommandName
		const stoppableCommand = this.stoppableCommand
		const stoppableMap = this.withStoppable.stoppableMap

		if (!stoppableMap || !stoppableMap.has(stoppableCommandName) || !stoppableCommand) {
			throw new Error(`Не найдена команда '${stoppableCommandName}'`)
		}

		stoppableCommand.stop()
		stoppableMap.delete(stoppableCommandName)
	}

	private get stoppableCommandFullName(): string {
		return commandFullName(this.stoppableCommandName, this.stoppableCommand)
	}
}