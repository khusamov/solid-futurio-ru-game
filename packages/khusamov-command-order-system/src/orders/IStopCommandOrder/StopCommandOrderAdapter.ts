import {IUniversalObject} from 'khusamov-universal-object';
import {TResolveParameters, TResolverFunction} from 'khusamov-inversion-of-control';
import IStopCommandOrder from './IStopCommandOrder';

export default class StopCommandOrderAdapter<R extends TResolverFunction> implements IStopCommandOrder<R> {
	public readonly type = 'StopCommand'
	public constructor(private universalObject: IUniversalObject) {}

	public get targetObject(): TResolveParameters<R> {
		return this.universalObject.getValue('targetObject', [''] as unknown as TResolveParameters<R>)
	}

	public get command(): string | undefined {
		return this.universalObject.getValue('command')
	}
}