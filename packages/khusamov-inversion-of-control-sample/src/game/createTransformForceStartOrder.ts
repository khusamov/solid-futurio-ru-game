import {createUniversalObject, Vector} from 'khusamov-base-types';
import {ITransformForceOrder} from 'khusamov-game-command-system';

export default function createTransformForceStartOrder(commandName: string, translate: Vector, rotate: number = 0, scale: number = 1, length: number = 0) {
	return (
		createUniversalObject<ITransformForceOrder>({
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