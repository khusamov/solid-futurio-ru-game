import {TResolveParameters, TResolverFunction} from 'khusamov-inversion-of-control';
import {ICommandOrder} from 'khusamov-command-order-system';

// TODO Приказ IMoveCommandOrder переместить в пакет khusamov-mechanical-motion

export default interface IMoveCommandOrder<R extends TResolverFunction> extends ICommandOrder {
	readonly type: 'MoveCommand',

	/**
	 * Параметры зависимости для вычисления объекта,
	 * для которого требуется вычислять поступательное движение.
	 */
	readonly targetObject: TResolveParameters<R>
}