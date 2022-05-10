import {IUniversalObject} from 'khusamov-universal-object';
import {RepeatableCommand, StartCommand} from 'khusamov-command-system';
import {IMovable, IMovableReflectedTypeRef, MoveCommand} from 'khusamov-game-command-system';
import {resolve} from 'khusamov-inversion-of-control';

/**
 * Создаем команду Поступательное движение космолета.
 */
export default function createSpaceshipStartMoveCommand(theSpaceship: IUniversalObject) {
	return (
		new StartCommand(
			'MoveSpaceshipCommand',
			theSpaceship,
			new RepeatableCommand(new MoveCommand(resolve<IMovable>('Adapter', theSpaceship, IMovableReflectedTypeRef)))
		)
	)
}