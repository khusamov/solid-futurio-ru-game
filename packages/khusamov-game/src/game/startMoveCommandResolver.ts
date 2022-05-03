import {IMovable, MoveCommand} from 'khusamov-mechanical-motion';
import {ICommand} from 'khusamov-base-types';
import {RepeatableCommand, StartCommand} from 'khusamov-command-system';
import {UniversalObjectAdapter} from 'khusamov-universal-object';

export default function startMoveCommandResolver(movable: IMovable): ICommand {
	return (
		new StartCommand(
			'MoveCommand',
			new UniversalObjectAdapter(movable),
			new RepeatableCommand(new MoveCommand(movable))
		)
	)
}