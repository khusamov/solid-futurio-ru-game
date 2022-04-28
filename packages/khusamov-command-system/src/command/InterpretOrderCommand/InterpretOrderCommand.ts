import {reflect} from 'typescript-rtti';
import {ICommand, IQueue, IUniversalObject} from 'khusamov-base-types';
import {resolve} from 'khusamov-inversion-of-control';
import OrderAdapter from '../../adapter/OrderAdapter';

export type TOrderQueue = IQueue<IUniversalObject>

/**
 * Интерпретация приказа от клиента.
 *
 * Приказ берется из очереди приказов 'OrderQueue' и конвертируется в команду.
 * Команда приказа размещается в очереди команд.
 * @link https://stepik.org/lesson/664251/step/1?unit=662137
 */
export default class InterpretOrderCommand implements ICommand {
	public readonly name: string = 'InterpretOrderCommand'
	public commandQueue?: IQueue<ICommand>

	public execute(): void {
		const orderObject = resolve<TOrderQueue>('OrderQueue').dequeue()
		if (orderObject) {
			const orderCommand = this.convertToCommand(orderObject)
			this.commandQueue?.enqueue(orderCommand)
		}
	}

	private convertToCommand(orderObject: IUniversalObject): ICommand {

		// Нет возможности добраться до родительского интерфейса ITyped и в итоге свойство type недоступно для адаптера.
		// https://github.com/typescript-rtti/typescript-rtti/issues/60
		//const order = resolve<IOrder>('Adapter', orderObject, reflect<IOrder>())
		// Поэтому пришлось тут адаптер написать вручную.

		const order = new OrderAdapter(orderObject)
		if (!order.type) throw new Error('Не определен тип приказа')

		const orderCommand = resolve<ICommand>(order.type, orderObject)
		orderCommand.commandQueue = this.commandQueue

		return orderCommand
	}
}