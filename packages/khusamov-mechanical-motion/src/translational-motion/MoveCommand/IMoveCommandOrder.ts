import {TResolveParameters, TResolver} from 'khusamov-inversion-of-control';
import {ICommandOrder} from 'khusamov-command-system';

export interface IMoveCommandOrder<R extends TResolver = TResolver> extends ICommandOrder<'MoveCommand'> {
	/**
	 * Параметры зависимости для вычисления объекта,
	 * для которого требуется вычислять поступательное движение.
	 */
	readonly targetObject: TResolveParameters<R>
}