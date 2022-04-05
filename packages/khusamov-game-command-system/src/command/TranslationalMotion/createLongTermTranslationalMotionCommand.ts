import {IoC} from 'khusamov-inversion-of-control';
import ITranslationalMotion from './ITranslationalMotion';
import {IUniversalObject} from 'khusamov-base-types';
import {reflect} from 'typescript-rtti';
import ShortTimeTranslationalMotionCommand from './ShortTimeTranslationalMotionCommand';
import {BridgeCommand, MacroCommand, RepeatCommand} from 'khusamov-command-system';

/**
 * Создать команду длительного поступательного движения.
 * @param universalObject
 */
export default function createLongTermTranslationalMotionCommand(universalObject: IUniversalObject): BridgeCommand {
	const movable = IoC.resolve<ITranslationalMotion>('Adapter', universalObject, reflect<ITranslationalMotion>())

	const translationalMotionCommand = new BridgeCommand
	translationalMotionCommand.inject(
		new MacroCommand([
			new ShortTimeTranslationalMotionCommand(movable),
			new RepeatCommand(translationalMotionCommand)
		])
	)

	return translationalMotionCommand
}