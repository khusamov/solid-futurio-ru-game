import {Adapter} from 'khusamov-universal-object';
import IMoveCommandOrder from './IMoveCommandOrder';
import {TResolveParameters, TResolverFunction} from 'khusamov-inversion-of-control';

export default class MoveCommandOrderAdapter<R extends TResolverFunction> extends Adapter implements IMoveCommandOrder<R> {
	public readonly type = 'MoveCommand'

	public get targetObject(): TResolveParameters<R> {
		return this.universalObject.getValue('targetObject', [''] as unknown as TResolveParameters<R>)
	}
}