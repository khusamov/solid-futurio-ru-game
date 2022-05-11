import {Adapter} from 'khusamov-universal-object';
import IIncreaseForceCommandOrder from './IIncreaseForceCommandOrder';
import {TResolveParameters, TResolverFunction} from 'khusamov-inversion-of-control';

export default class IncreaseForceCommandOrderAdapter<R extends TResolverFunction> extends Adapter implements IIncreaseForceCommandOrder<R> {
	public readonly type = 'IncreaseForceCommand'

	public get targetObject(): TResolveParameters<R> {
		return this.universalObject.getValue('targetObject', [''] as unknown as TResolveParameters<R>)
	}

	public get increment(): number {
		return this.universalObject.getValue('increment', 0)
	}
}