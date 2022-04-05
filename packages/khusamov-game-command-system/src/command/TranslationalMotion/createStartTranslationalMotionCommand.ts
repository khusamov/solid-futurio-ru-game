import {reflect} from 'typescript-rtti';
import {ICommand, IUniversalObject} from 'khusamov-base-types';
import {IoC} from 'khusamov-inversion-of-control';
import {StartCommand} from 'khusamov-command-system';
import createLongTermTranslationalMotionCommand from './createLongTermTranslationalMotionCommand';
import IStartStopObject from 'khusamov-command-system/dist/command/StartStop/IStartStopObject';

export default function createStartTranslationalMotionCommand(universalObject: IUniversalObject): ICommand {
	return (
		new StartCommand(
			IoC.resolve<IStartStopObject>('Adapter', universalObject, reflect<IStartStopObject>()),
			createLongTermTranslationalMotionCommand(universalObject),
			'LongTermTranslationalMotion'
		)
	)
}