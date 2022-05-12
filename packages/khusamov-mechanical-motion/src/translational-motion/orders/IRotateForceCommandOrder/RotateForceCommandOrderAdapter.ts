import {Adapter} from 'khusamov-universal-object';
import {TResolveParameters, TResolver} from 'khusamov-inversion-of-control';
import IRotateForceCommandOrder from './IRotateForceCommandOrder';

export default class RotateForceCommandOrderAdapter<R extends TResolver> extends Adapter implements IRotateForceCommandOrder<R> {
	public readonly type = 'RotateForceCommand'

	public get targetObject(): TResolveParameters<R> {
		return this.universalObject.getValue('targetObject', [''] as unknown as TResolveParameters<R>)
	}

	public get increment(): number {
		return this.universalObject.getValue('increment', 0)
	}
}