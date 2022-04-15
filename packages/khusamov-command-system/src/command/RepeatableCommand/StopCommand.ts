import {ICommand, IStoppable, IUniversalObject} from 'khusamov-base-types';
import IObjectWithStoppable from './IObjectWithStoppable';
import {resolve} from 'khusamov-inversion-of-control';
import {reflect} from 'typescript-rtti';

/**
 * Остановка длительной команды.
 */
export default class StopCommand implements ICommand {
	private withStoppable: IObjectWithStoppable
	private stoppableCommand: ICommand & IStoppable | undefined

	get name(): string {
		return 'StopCommand: ' + (this.stoppableCommand?.name || `[not found '${this.stoppableCommandName}']`)
	}

	/**
	 * Конструктор.
	 * @param stoppableCommandName Имя останавливаемой команды.
	 * @param targetObject Объект, для которого требуется остановка определенной команды.
	 */
	constructor(
		private stoppableCommandName: string,
		private targetObject: IUniversalObject
	) {
		this.withStoppable = resolve<IObjectWithStoppable>('Adapter', this.targetObject, reflect<IObjectWithStoppable>())
		this.stoppableCommand = this.withStoppable.stoppableCommandMap?.get(this.stoppableCommandName)
	}

	public execute(): void {
		this.stoppableCommand?.stop()
		this.withStoppable.stoppableCommandMap?.delete(this.stoppableCommandName)
	}
}