import {ICommandOrder} from 'khusamov-command-system';
import {TResolveParameters, TResolver} from 'khusamov-inversion-of-control';

export interface IRotateCommandOrder<R extends TResolver = TResolver> extends ICommandOrder<'RotateCommand'> {
	/**
	 * Параметры зависимости для вычисления объекта,
	 * для которого требуется вычислять вращательное движение.
	 */
	readonly targetObject: TResolveParameters<R>
}