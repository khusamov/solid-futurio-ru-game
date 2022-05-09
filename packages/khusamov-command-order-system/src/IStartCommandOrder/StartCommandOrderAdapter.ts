
import {Adapter} from 'khusamov-universal-object';
import IStartCommandOrder from './IStartCommandOrder';
import {TResolveParameters, TResolverFunction} from 'khusamov-inversion-of-control';
import IOrder from '../IOrder';

export default class StartCommandOrderAdapter<R extends TResolverFunction, O extends IOrder> extends Adapter implements IStartCommandOrder<R, O> {
	public readonly type = 'StartCommand'

	public get targetObject(): TResolveParameters<R> {
		return this.universalObject.getValue('targetObject', [''] as unknown as TResolveParameters<R>)
	}

	public get commandName(): string {
		return this.universalObject.getValue('commandName', '')
	}

	public get command(): O {
		return this.universalObject.getValue<IOrder>('command', {type: ''}) as O
	}
}