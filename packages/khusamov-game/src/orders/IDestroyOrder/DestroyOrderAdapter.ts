import {Adapter} from 'khusamov-universal-object';
import IDestroyOrder from './IDestroyOrder';
import {TResolveParameters, TResolverFunction} from 'khusamov-inversion-of-control';

export default class DestroyOrderAdapter<R extends TResolverFunction> extends Adapter implements IDestroyOrder<R> {
	public readonly type = 'Destroy'

	public get targetObject(): TResolveParameters<R> {
		return this.universalObject.getValue('targetObject', [''] as unknown as TResolveParameters<R>)
	}
}