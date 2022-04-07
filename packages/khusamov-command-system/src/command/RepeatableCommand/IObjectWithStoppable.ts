import {IStoppable} from 'khusamov-base-types';

export default interface IObjectWithStoppable {
	stoppableCommandMap: Map<string, IStoppable> | undefined
}