import {resolve} from 'khusamov-inversion-of-control';
import {ICommand} from '../../interfaces';
import {IMacroCommandOrder} from './IMacroCommandOrder';
import {MacroCommand} from './MacroCommand';

export function macroCommandResolver(macroCommandOrder: IMacroCommandOrder): ICommand {
	return (
		new MacroCommand(
			macroCommandOrder.commands.map(
				commandOrder => resolve<ICommand>(commandOrder.type, commandOrder)
			)
		)
	)
}