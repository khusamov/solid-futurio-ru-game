import {ICommandOrder} from '../../interfaces';

export interface IMacroCommandOrder<O extends ICommandOrder = ICommandOrder> extends ICommandOrder<'MacroCommand'>  {
	readonly commands: O[]
}