import {reflect} from 'typescript-rtti';
import {ICommand, IUniversalObject} from 'khusamov-base-types';
import {IoC} from 'khusamov-inversion-of-control';
import {IStartStopObject, StopCommand} from 'khusamov-command-system';

export default function createStopTranslationalMotionCommand(universalObject: IUniversalObject): ICommand {
	return (
		new StopCommand(
			IoC.resolve<IStartStopObject>('Adapter', universalObject, reflect<IStartStopObject>()),
			'LongTermTranslationalMotion'
		)
	)
}