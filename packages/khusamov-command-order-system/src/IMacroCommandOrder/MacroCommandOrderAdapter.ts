import {Adapter} from 'khusamov-universal-object';
import IMacroCommandOrder from './IMacroCommandOrder';
import IOrder from '../IOrder';

export default class MacroCommandOrderAdapter<O extends IOrder> extends Adapter implements IMacroCommandOrder<O> {
	readonly type = 'MacroCommand'

	public get commands(): O[] {
		return this.universalObject.getValue('commands', [])
	}
}