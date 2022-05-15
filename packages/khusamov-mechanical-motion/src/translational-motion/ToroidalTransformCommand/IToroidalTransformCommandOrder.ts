import {ICommandOrder} from 'khusamov-command-system';
import {TResolveParameters, TResolver} from 'khusamov-inversion-of-control';

export interface IToroidalTransformCommandOrder<R extends TResolver = TResolver> extends ICommandOrder<'ToroidalTransformCommand'> {
	/**
	 * Параметры зависимости для вычисления объекта,
	 * для которого требуется увеличить приложенную силу.
	 */
	readonly targetObject: TResolveParameters<R>

	/**
	 * Зависимость, возвращающая размер поверхности-развертки тора.
	 */
	readonly toroidalSurfaceSize: TResolveParameters
}