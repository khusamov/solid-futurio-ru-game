import {createUniversalObject, Vector} from 'khusamov-base-types';
import {ITransformForceAgentMessage} from 'khusamov-game-command-system';

export default function createTransformForceStartMessage(translate: Vector, rotate: number = 0, scale: number = 1) {
	return (
		createUniversalObject<ITransformForceAgentMessage>({
			type: 'TransformForce',
			targetObject: {
				type: 'GameObject',
				name: 'theSpaceship'
			},
			translate,
			rotate,
			scale
		})
	)
}