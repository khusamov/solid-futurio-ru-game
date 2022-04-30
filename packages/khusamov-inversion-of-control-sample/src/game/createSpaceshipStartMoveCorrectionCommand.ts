import {IUniversalObject} from 'khusamov-universal-object';
import {ISize} from 'khusamov-base-types';
import {RepeatableCommand, StartCommand} from 'khusamov-command-system';
import {IMovable, IMovableReflectedTypeRef, MoveCorrectionCommand} from 'khusamov-game-command-system';
import {resolve} from 'khusamov-inversion-of-control';
import positionCorrectionForToroid from './positionCorrectionForToroid';

/**
 * Создаем команду Коррекция координат космолета. Пространство бублик.
 */
export default function createSpaceshipStartMoveCorrectionCommand(theSpaceship: IUniversalObject, getSize: () => ISize) {
	return (
		new StartCommand(
			'MoveCorrectionSpaceshipCommand',
			theSpaceship,
			new RepeatableCommand(
				new MoveCorrectionCommand(
					resolve<IMovable>('Adapter', theSpaceship, IMovableReflectedTypeRef),
					movable => {
						movable.position = positionCorrectionForToroid(movable.position, getSize)
					}
				)
			)
		)
	)
}