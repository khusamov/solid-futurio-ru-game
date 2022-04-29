import {IUniversalObject} from 'khusamov-universal-object';
import {IOrder} from '../command/InterpretOrderCommand';

export default class OrderAdapter implements Partial<IOrder> {
	constructor(private universalObject: IUniversalObject) {}

	public get type(): string | undefined {
		return this.universalObject.getValue('type')
	}

	public set type(value: string | undefined) {
		this.universalObject.setValue('type', value)
	}
}