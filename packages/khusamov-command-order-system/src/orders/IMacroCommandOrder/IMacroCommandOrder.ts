import ICommandOrder from '../ICommandOrder';

export default interface IMacroCommandOrder<O extends ICommandOrder> extends ICommandOrder  {
	readonly type: 'MacroCommand'
	readonly commands: O[]
}