import {ICommandOrder} from 'khusamov-command-system';
import {TResolveParameters, TResolver} from 'khusamov-inversion-of-control';

export interface IRotateForceCommandOrder<R extends TResolver = TResolver> extends ICommandOrder<'RotateForceCommand'> {
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