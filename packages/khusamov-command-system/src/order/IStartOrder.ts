import {IOrder} from '../command/InterpretOrderCommand';
import {ITyped} from 'khusamov-base-types';

export default interface IStartOrder extends IOrder {
	type: 'StartCommand'
	targetObjectSearchData: ITyped & Record<string, any>
	command: ITyped & Record<string, any>
}