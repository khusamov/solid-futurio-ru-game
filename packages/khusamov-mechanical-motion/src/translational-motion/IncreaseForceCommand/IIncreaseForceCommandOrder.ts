import {ICommandOrder} from 'khusamov-command-system';
import {TResolveParameters, TResolver} from 'khusamov-inversion-of-control';

export interface IIncreaseForceCommandOrder<R extends TResolver = TResolver> extends ICommandOrder<'IncreaseForceCommand'> {
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