import {IUniversalObject} from 'khusamov-universal-object';
import IOrder from './IOrder';

export default class OrderAdapter implements IOrder {
	constructor(private universalObject: IUniversalObject) {}

	public get type(): string {
		return this.universalObject.getValue('type', 'UnknownType')
	}

	public set type(value: string) {
		this.universalObject.setValue('type', value)
	}
}