import {ICommandOrder} from 'khusamov-command-system';
import {TResolveParameters, TResolver} from 'khusamov-inversion-of-control';

export interface IIncreaseRadiusCommandOrder<R extends TResolver = TResolver> extends ICommandOrder<'IncreaseRadiusCommand'> {
	/**
	 * Параметры зависимости для вычисления объекта,
	 * для которого требуется увеличить расстояние до точки приложения силы.
	 */
	readonly targetObject: TResolveParameters<R>

	/**
	 * Приращение расстояния до точки приложения силы.
	 * Метры.
	 */
	readonly increment: number
}