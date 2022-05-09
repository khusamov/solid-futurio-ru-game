import {Adapter} from 'khusamov-universal-object';
import IRelayCommandOrder from './IRelayCommandOrder';
import {TResolveParameters, TResolverFunction} from 'khusamov-inversion-of-control';

export default class RelayCommandOrderAdapter<R extends TResolverFunction = TResolverFunction> extends Adapter implements IRelayCommandOrder<R> {
	public readonly type = 'RelayCommand'

	public get name(): string {
		return this.universalObject.getValue('name', 'Nameless')
	}

	public get action(): TResolveParameters<R> {
		return this.universalObject.getValue('action', ['Noaction'] as unknown as TResolveParameters<R>)
	}
}