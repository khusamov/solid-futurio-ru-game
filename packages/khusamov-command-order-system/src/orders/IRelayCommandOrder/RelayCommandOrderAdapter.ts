import {Adapter} from 'khusamov-universal-object';
import IRelayCommandOrder from './IRelayCommandOrder';
import {TResolveParameters} from 'khusamov-inversion-of-control';

export default class RelayCommandOrderAdapter<A extends TResolveParameters> extends Adapter implements IRelayCommandOrder<A> {
	public readonly type = 'RelayCommand'

	public get name(): string {
		return this.universalObject.getValue('name', 'Nameless')
	}

	public get action(): A {
		return this.universalObject.getValue('action', ['Noaction'] as unknown as A)
	}
}