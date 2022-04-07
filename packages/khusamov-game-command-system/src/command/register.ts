import {IoC} from 'khusamov-inversion-of-control';
import {ICommand, IRegistrator, IUniversalObject} from 'khusamov-base-types';
import IMovable from './MoveCommand/IMovable';
import {reflect} from 'typescript-rtti';
import {StartCommand} from 'khusamov-command-system';
import {MoveCommand} from './MoveCommand';
import IncreaseForceCommand from './IncreaseForceCommand';
import DecreaseForceCommand from './DecreaseForceCommand';
import IncreaseForceAngleCommand from './IncreaseForceAngleCommand';
import DecreaseForceAngleCommand from './DecreaseForceAngleCommand';

const commandInfoList = [{
	commandName: 'MoveCommand',
	CommandClass: MoveCommand
}, {
	commandName: 'DecreaseForceCommand',
	CommandClass: DecreaseForceCommand
}, {
	commandName: 'IncreaseForceCommand',
	CommandClass: IncreaseForceCommand
}, {
	commandName: 'DecreaseForceAngleCommand',
	CommandClass: DecreaseForceAngleCommand
}, {
	commandName: 'IncreaseForceAngleCommand',
	CommandClass: IncreaseForceAngleCommand
}]

export default function register() {
	for (const {commandName, CommandClass} of commandInfoList) {
		IoC.resolve<IRegistrator>('Register', commandName, (
			(universalObject: IUniversalObject): ICommand => {
				const movable = IoC.resolve<IMovable>('Adapter', universalObject, reflect<IMovable>())
				return new StartCommand(universalObject, new CommandClass(movable), commandName)
			}
		))
	}
}