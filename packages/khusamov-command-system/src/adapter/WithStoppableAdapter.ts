import {IStoppable, IUniversalObject, IWithStoppable, TStoppableKey} from 'khusamov-base-types';

export default class WithStoppableAdapter<S extends IStoppable = IStoppable> implements IWithStoppable<S> {
	constructor(private universalObject: IUniversalObject) {}

	public get stoppableMap(): Map<TStoppableKey, S> | undefined {
		return this.universalObject.getValue('stoppableMap')
	}

	public set stoppableMap(value: Map<TStoppableKey, S> | undefined) {
		this.universalObject.setValue('stoppableMap', value)
	}
}