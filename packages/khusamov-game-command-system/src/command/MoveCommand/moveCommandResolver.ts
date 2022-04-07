import {reflect} from 'typescript-rtti';
import {ICommand, IUniversalObject} from 'khusamov-base-types';
import {IoC} from 'khusamov-inversion-of-control';
import {IObjectWithStoppable, RepeatableCommand, StartCommand} from 'khusamov-command-system';
import MoveCommand from './MoveCommand';
import IMovable from './IMovable';

export default function moveCommandResolver(universalObject: IUniversalObject<any>): ICommand {
	return new StartCommand(universalObject, createRepeatableMoveCommand(universalObject), 'MoveCommand')
}

function createRepeatableMoveCommand(universalObject: IUniversalObject<any>) {
	const movable = IoC.resolve<IMovable>('Adapter', universalObject, reflect<IMovable>())
	return new RepeatableCommand(new MoveCommand(movable))
}