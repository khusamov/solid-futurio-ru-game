import {IStoppable} from 'khusamov-base-types';
import {Adapter} from 'khusamov-universal-object';
import {TStoppableKey, IWithStoppable} from './IWithStoppable';

export class WithStoppableAdapter<S extends IStoppable = IStoppable> extends Adapter implements IWithStoppable<S> {
	public get stoppableMap(): Map<TStoppableKey, S> | undefined {
		return this.universalObject.getValue('stoppableMap')
	}

	public set stoppableMap(value: Map<TStoppableKey, S> | undefined) {
		this.universalObject.setValue('stoppableMap', value)
	}
}