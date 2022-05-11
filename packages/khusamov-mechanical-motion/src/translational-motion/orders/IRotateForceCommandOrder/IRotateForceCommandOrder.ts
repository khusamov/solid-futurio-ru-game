import {ICommandOrder} from 'khusamov-command-order-system';
import {TResolveParameters, TResolverFunction} from 'khusamov-inversion-of-control';

export default interface IRotateForceCommandOrder<R extends TResolverFunction = TResolverFunction> extends ICommandOrder {
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