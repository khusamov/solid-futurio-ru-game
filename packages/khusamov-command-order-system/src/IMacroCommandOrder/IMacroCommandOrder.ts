import IOrder from '../IOrder';

export default interface IMacroCommandOrder<O extends IOrder> extends IOrder  {
	readonly type: 'MacroCommand'
	readonly commands: O[]
}