import {Adapter, IUniversalObject} from 'khusamov-universal-object';
import {TResolveParameters, TResolverFunction} from 'khusamov-inversion-of-control';
import IStopCommandOrder from './IStopCommandOrder';

export default class StopCommandOrderAdapter<R extends TResolverFunction> extends Adapter implements IStopCommandOrder<R> {
	public readonly type = 'StopCommand'
	readonly commandName?: string | undefined

	// TODO Сделать в классе Adapter возможность определять не обязательные параметры типа name в автоматическом режиме.
	public constructor(universalObject: IUniversalObject) {
		super(universalObject)
		const commandName = this.universalObject.getValue<string>('commandName')
		if (commandName) this.commandName = commandName
	}

	public get targetObject(): TResolveParameters<R> {
		return this.universalObject.getValue('targetObject', [''] as unknown as TResolveParameters<R>)
	}
}