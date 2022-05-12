import {Adapter} from 'khusamov-universal-object';
import {TResolveParameters, TResolver} from 'khusamov-inversion-of-control';
import ICommandOrder from '../ICommandOrder';
import IStartCommandOrder from './IStartCommandOrder';

export default class StartCommandOrderAdapter<R extends TResolver, O extends ICommandOrder> extends Adapter implements IStartCommandOrder<R, O> {
	public readonly type = 'StartCommand'

	public get targetObject(): TResolveParameters<R> {
		return this.universalObject.getValue('targetObject', [''] as unknown as TResolveParameters<R>)
	}

	public get commandName(): string {
		return this.universalObject.getValue('commandName', '')
	}

	public get command(): O {
		return this.universalObject.getValue<ICommandOrder>('command', {type: ''}) as O
	}
}