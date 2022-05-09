import {TResolveParameters, TResolverFunction} from 'khusamov-inversion-of-control';
import IOrder from '../IOrder';

export default interface IStopCommandOrder<R extends TResolverFunction> extends IOrder {
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