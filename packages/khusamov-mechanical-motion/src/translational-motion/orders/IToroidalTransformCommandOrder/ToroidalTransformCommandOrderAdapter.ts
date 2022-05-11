import {Adapter} from 'khusamov-universal-object';
import IToroidalTransformCommandOrder from './IToroidalTransformCommandOrder';
import {TResolveParameters, TResolverFunction} from 'khusamov-inversion-of-control';
import {TGetSize} from '../../ToroidalTransformCommand';

export default class ToroidalTransformCommandOrderAdapter<R extends TResolverFunction> extends Adapter implements IToroidalTransformCommandOrder<R> {
	public readonly type = 'ToroidalTransformCommand'

	public get targetObject(): TResolveParameters<R> {
		return this.universalObject.getValue('targetObject', [''] as unknown as TResolveParameters<R>)
	}

	public get getToroidalSurfaceSize(): TGetSize {
		return this.universalObject.getValue('getToroidalSurfaceSize', () => ({width: 0, height: 0}))
	}
}