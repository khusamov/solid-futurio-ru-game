import {ICommandOrder} from 'khusamov-command-order-system';
import {TResolveParameters, TResolverFunction} from 'khusamov-inversion-of-control';

export default interface IIncreaseForceCommandOrder<R extends TResolverFunction> extends ICommandOrder {
	readonly type: 'IncreaseForceCommand'

	/**
	 * Параметры зависимости для вычисления объекта,
	 * для которого требуется увеличить приложенную силу.
	 */
	readonly targetObject: TResolveParameters<R>

	/**
	 * Приращение силы.
	 * Ньютон.
	 */
	readonly increment: number
}