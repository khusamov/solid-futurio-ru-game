import {createUniversalObject} from 'khusamov-base-types';
import {IStopAgentMessage} from 'khusamov-command-system';

export default function createTransformForceStopMessage(commandName: string) {
	return (
		createUniversalObject<IStopAgentMessage>({
			type: 'StopCommand',
			commandName,
			targetObject: {
				type: 'GameObject',
				name: 'theSpaceship'
			}
		})
	)
}