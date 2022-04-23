import {createUniversalObject} from 'khusamov-base-types';
import {IStopAgentMessage} from 'khusamov-command-system';

export default function createTransformForceStopMessage() {
	return (
		createUniversalObject<IStopAgentMessage>({
			type: 'StopCommand',
			commandName: 'TransformForce',
			targetObject: {
				type: 'GameObject',
				name: 'theSpaceship'
			}
		})
	)
}