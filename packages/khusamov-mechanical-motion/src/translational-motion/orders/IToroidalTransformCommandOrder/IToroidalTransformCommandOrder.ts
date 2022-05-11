import {ICommandOrder} from 'khusamov-command-order-system';
import {TResolveParameters, TResolverFunction} from 'khusamov-inversion-of-control';
import {TGetSize} from '../../ToroidalTransformCommand';

export default interface IToroidalTransformCommandOrder<R extends TResolverFunction = TResolverFunction> extends ICommandOrder {
	readonly type: 'ToroidalTransformCommand'

	/**
	 * Параметры зависимости для вычисления объекта,
	 * для которого требуется увеличить приложенную силу.
	 */
	readonly targetObject: TResolveParameters<R>

	/**
	 * Функция, возвращающая размер поверхности-развертки тора.
	 */
	readonly getToroidalSurfaceSize: TGetSize
}