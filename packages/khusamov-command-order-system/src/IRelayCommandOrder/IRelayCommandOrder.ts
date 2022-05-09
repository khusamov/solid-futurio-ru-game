import {TResolveParameters, TResolverFunction} from 'khusamov-inversion-of-control';
import IOrder from '../IOrder';

export default interface IRelayCommandOrder<R extends TResolverFunction> extends IOrder {
	readonly type: 'RelayCommand'

	/**
	 * Имя действия для RelayCommand.
	 */
	readonly name: string

	/**
	 * Действие для RelayCommand.
	 * Определяется через массив:
	 * - Первый элемент это имя зависимости, которое вернет TAction.
	 * - Последующие элементы это параметры вычисления зависимости.
	 */
	readonly action: TResolveParameters<R>
}