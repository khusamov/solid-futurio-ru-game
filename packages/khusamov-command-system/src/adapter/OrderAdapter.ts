import {IUniversalObject} from 'khusamov-universal-object';
import {IOrder} from '../command/InterpretOrderCommand';

// Нет возможности добраться до родительского интерфейса ITyped и в итоге свойство type недоступно для адаптера.
// https://github.com/typescript-rtti/typescript-rtti/issues/60
// const order = resolve<IOrder>('Adapter', orderObject, reflect<IOrder>())
// Поэтому пришлось тут адаптер написать вручную.


export default class OrderAdapter implements IOrder {
	constructor(private universalObject: IUniversalObject) {}

	public get type(): string {
		return this.universalObject.getValue('type', 'UnknownType')
	}

	public set type(value: string) {
		this.universalObject.setValue('type', value)
	}
}