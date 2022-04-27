import {IOrder} from '../command/InterpretOrderCommand';
import {ITyped} from 'khusamov-base-types';

export default interface IStopOrder extends IOrder {
	type: 'StopCommand'
	targetObjectSearchData: ITyped & Record<string, any>
	stoppableCommandName: string
}