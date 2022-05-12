import {Adapter} from 'khusamov-universal-object';
import IToroidalTransformCommandOrder from './IToroidalTransformCommandOrder';
import {TResolveParameters, TResolver} from 'khusamov-inversion-of-control';

export default class ToroidalTransformCommandOrderAdapter<R extends TResolver> extends Adapter implements IToroidalTransformCommandOrder<R> {
	public readonly type = 'ToroidalTransformCommand'

	public get targetObject(): TResolveParameters<R> {
		return this.universalObject.getValue('targetObject', [''] as unknown as TResolveParameters<R>)
	}

	public get toroidalSurfaceSize(): TResolveParameters {
		return this.universalObject.getValue('toroidalSurfaceSize', ['ToroidalSurfaceSize'])
	}
}