import {ICommand, IInjectableCommand, IRegistrator} from 'khusamov-base-types';
import {IoC, UniversalObject} from 'khusamov-inversion-of-control';
import {BridgeCommand, MacroCommand, RepeatCommand} from 'khusamov-command-system';
import {IStartable, IStopable, StartCommand, StopCommand} from 'khusamov-command-system';
import MoveCommand from './MoveCommand';
import IMovable from './IMovable';


IoC.resolve<IRegistrator>(
	'Registrator',
	'Command.MoveLongTime',
	(universalObject: UniversalObject): IInjectableCommand => {
		const movable = IoC.resolve<IMovable>('Adapter', 'IMovable', universalObject);
		const moveLongTimeCommand = new BridgeCommand()
		moveLongTimeCommand.inject(
			new MacroCommand([
				new MoveCommand(movable),
				new RepeatCommand(moveLongTimeCommand)
			])
		)
		return moveLongTimeCommand;
	}
)

IoC.resolve<IRegistrator>(
	'Registrator',
	'Command.MoveLongTime.Start',
	(universalObject: UniversalObject): ICommand => {
		const startable = IoC.resolve<IStartable>('Adapter', 'IStartable', universalObject);
		return new StartCommand(
			startable,
			IoC.resolve<IInjectableCommand>('Command.MoveLongTime', universalObject)
		)
	}
)

IoC.resolve<IRegistrator>(
	'Registrator',
	'Command.MoveLongTime.Stop',
	(universalObject: UniversalObject): ICommand => {
		const stopable = IoC.resolve<IStopable>('Adapter', 'IStopable', universalObject);
		return new StopCommand(stopable)
	}
)