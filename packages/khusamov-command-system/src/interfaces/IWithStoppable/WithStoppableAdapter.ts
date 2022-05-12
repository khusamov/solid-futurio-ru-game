import {IStoppable} from 'khusamov-base-types';
import {IUniversalObject} from 'khusamov-universal-object';
import IWithStoppable, {TStoppableKey} from './IWithStoppable';

export default class WithStoppableAdapter<S extends IStoppable = IStoppable> implements IWithStoppable<S> {
	constructor(private universalObject: IUniversalObject) {}

	public get stoppableMap(): Map<TStoppableKey, S> | undefined {
		return this.universalObject.getValue('stoppableMap')
	}

	public set stoppableMap(value: Map<TStoppableKey, S> | undefined) {
		this.universalObject.setValue('stoppableMap', value)
	}
}