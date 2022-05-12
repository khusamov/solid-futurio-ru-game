import {Adapter} from 'khusamov-universal-object';
import IMoveCommandOrder from './IMoveCommandOrder';
import {TResolveParameters, TResolver} from 'khusamov-inversion-of-control';

export default class MoveCommandOrderAdapter<R extends TResolver> extends Adapter implements IMoveCommandOrder<R> {
	public readonly type = 'MoveCommand'

	public get targetObject(): TResolveParameters<R> {
		return this.universalObject.getValue('targetObject', [''] as unknown as TResolveParameters<R>)
	}
}