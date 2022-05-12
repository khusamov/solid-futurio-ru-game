import {ICommandOrder} from 'khusamov-command-order-system';
import {TResolveParameters, TResolver} from 'khusamov-inversion-of-control';

export default interface IRotateForceCommandOrder<R extends TResolver = TResolver> extends ICommandOrder {
	readonly type: 'RotateForceCommand'

	/**
	 * Параметры зависимости для вычисления объекта,
	 * для которого требуется увеличить приложенную силу.
	 */
	readonly targetObject: TResolveParameters<R>

	/**
	 * Приращение угла.
	 * Радианы.
	 */
	readonly increment: number
}