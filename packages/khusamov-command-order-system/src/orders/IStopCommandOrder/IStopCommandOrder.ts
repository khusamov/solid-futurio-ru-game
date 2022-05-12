import {TResolveParameters, TResolver} from 'khusamov-inversion-of-control';
import ICommandOrder from '../ICommandOrder';

export default interface IStopCommandOrder<R extends TResolver = TResolver> extends ICommandOrder {
	readonly type: 'StopCommand'

	/**
	 * Параметры зависимости для вычисления объекта,
	 * для которого требуется остановить определенную команду.
	 */
	readonly targetObject: TResolveParameters<R>

	/**
	 * Идентификатор останавливаемой команды.
	 * Если команда не указана, то будут остановлены все команды для целевого объекта.
	 */
	readonly commandName?: string | undefined
}