import {ICommand} from 'khusamov-base-types';
import {resolve} from 'khusamov-inversion-of-control';
import {createUniversalObject, IUniversalObject} from 'khusamov-universal-object';
import {MacroCommand} from 'khusamov-command-system';
import MacroCommandOrderAdapter from './MacroCommandOrderAdapter';

export default function macroCommandResolver(macroCommandOrderObject: IUniversalObject): ICommand {
	const macroCommandOrder = new MacroCommandOrderAdapter(macroCommandOrderObject)
	return (
		new MacroCommand(
			macroCommandOrder.commands.map(
				commandOrder => resolve<ICommand>(commandOrder.type, createUniversalObject(commandOrder))
			)
		)
	)
}