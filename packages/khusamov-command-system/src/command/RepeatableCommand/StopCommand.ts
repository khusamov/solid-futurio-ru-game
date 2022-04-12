import {ICommand, IUniversalObject} from 'khusamov-base-types';
import IObjectWithStoppable from './IObjectWithStoppable';
import {IoC} from 'khusamov-inversion-of-control';
import {reflect} from 'typescript-rtti';

/**
 * Остановка длительной команды.
 */
export default class StopCommand implements ICommand {
	/**
	 * Конструктор.
	 * @param stoppableCommandName Имя останавливаемой команды.
	 * @param targetObject Объект, для которого требуется остановка определенной команды.
	 */
	constructor(
		private stoppableCommandName: string,
		private targetObject: IUniversalObject
	) {}

	public execute(): void {
		const withStoppable = IoC.resolve<IObjectWithStoppable>('Adapter', this.targetObject, reflect<IObjectWithStoppable>())
		const stoppableCommand = withStoppable.stoppableCommandMap?.get(this.stoppableCommandName)
		stoppableCommand?.stop()
	}
}