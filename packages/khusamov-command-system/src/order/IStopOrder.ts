import {IOrder} from '../command/InterpretOrderCommand';
import {ITyped} from 'khusamov-base-types';

// TODO Удалить!

export default interface IStopOrder extends IOrder {
	type: 'StopCommand'
	targetObjectSearchData: ITyped & Record<string, any>
	stoppableCommandName: string
}