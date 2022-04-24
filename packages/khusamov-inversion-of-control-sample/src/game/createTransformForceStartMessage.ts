import {createUniversalObject, Vector} from 'khusamov-base-types';
import {ITransformForceAgentMessage} from 'khusamov-game-command-system';

export default function createTransformForceStartMessage(commandName: string, translate: Vector, rotate: number = 0, scale: number = 1, length: number = 0) {
	return (
		createUniversalObject<ITransformForceAgentMessage>({
			type: 'TransformForce',
			commandName,
			targetObject: {
				type: 'GameObject',
				name: 'theSpaceship'
			},
			translate,
			rotate,
			scale,
			length
		})
	)
}