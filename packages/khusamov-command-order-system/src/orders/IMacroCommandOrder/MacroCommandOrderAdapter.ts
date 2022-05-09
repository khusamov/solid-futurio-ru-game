import {Adapter} from 'khusamov-universal-object';
import IMacroCommandOrder from './IMacroCommandOrder';
import ICommandOrder from '../ICommandOrder';

export default class MacroCommandOrderAdapter<O extends ICommandOrder> extends Adapter implements IMacroCommandOrder<O> {
	readonly type = 'MacroCommand'

	public get commands(): O[] {
		return this.universalObject.getValue('commands', [])
	}
}