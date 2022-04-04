import {IoC, UniversalObject} from 'khusamov-inversion-of-control';
import {IRegistrator} from 'khusamov-base-types';
import IMovable from './IMovable';
import MoveCommand from './MoveCommand';

IoC.resolve<IRegistrator>(
	'Registrator',
	'Command.Move',
	(universalObject: UniversalObject) => {
		const movable = IoC.resolve<IMovable>('Adapter', 'IMovable', universalObject);
		return new MoveCommand(movable)
	}
)