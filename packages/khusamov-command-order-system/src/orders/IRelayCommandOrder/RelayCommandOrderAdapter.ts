import {Adapter, IUniversalObject} from 'khusamov-universal-object';
import IRelayCommandOrder from './IRelayCommandOrder';
import {TResolveParameters} from 'khusamov-inversion-of-control';

export default class RelayCommandOrderAdapter<A extends TResolveParameters> extends Adapter implements IRelayCommandOrder<A> {
	public readonly type = 'RelayCommand'
	public readonly name?: string

	// TODO Сделать в классе Adapter возможность определять не обязательные параметры типа name в автоматическом режиме.
	public constructor(universalObject: IUniversalObject) {
		super(universalObject)
		const name = this.universalObject.getValue<string>('name')
		if (name) this.name = name
	}

	public get action(): A {
		return this.universalObject.getValue('action', ['Noaction'] as unknown as A)
	}
}