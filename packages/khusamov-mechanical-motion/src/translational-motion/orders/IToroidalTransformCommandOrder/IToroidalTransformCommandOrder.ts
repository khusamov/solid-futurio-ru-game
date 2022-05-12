import {ICommandOrder} from 'khusamov-command-order-system';
import {TResolveParameters, TResolver} from 'khusamov-inversion-of-control';

export default interface IToroidalTransformCommandOrder<R extends TResolver = TResolver> extends ICommandOrder {
	readonly type: 'ToroidalTransformCommand'

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