import {TResolveParameters, TResolverFunction} from 'khusamov-inversion-of-control';
import ICommandOrder from '../ICommandOrder';

export default interface IRelayCommandOrder<R extends TResolverFunction> extends ICommandOrder {
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