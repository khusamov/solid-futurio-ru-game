import {TResolveParameters, TResolverFunction} from 'khusamov-inversion-of-control';
import {ICommandOrder} from 'khusamov-command-order-system';

export default interface IMoveCommandOrder<R extends TResolverFunction = TResolverFunction> extends ICommandOrder {
	readonly type: 'MoveCommand',

	/**
	 * Параметры зависимости для вычисления объекта,
	 * для которого требуется вычислять поступательное движение.
	 */
	readonly targetObject: TResolveParameters<R>
}