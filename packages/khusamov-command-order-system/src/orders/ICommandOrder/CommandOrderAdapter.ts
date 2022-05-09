import {IUniversalObject} from 'khusamov-universal-object';
import ICommandOrder from './ICommandOrder';

export default class CommandOrderAdapter implements ICommandOrder {
	constructor(private universalObject: IUniversalObject) {}

	public get type(): string {
		return this.universalObject.getValue('type', 'UnknownType')
	}

	public set type(value: string) {
		this.universalObject.setValue('type', value)
	}
}