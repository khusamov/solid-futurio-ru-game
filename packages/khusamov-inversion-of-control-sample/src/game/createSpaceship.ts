import {createUniversalObject, Vector} from 'khusamov-base-types';
import {IMovable} from 'khusamov-game-command-system';

export default function createSpaceship() {
	return (
		createUniversalObject<IMovable & {name: string}>({
			name: 'theSpaceship',
			time: 0,
			mass: 1000,
			position: new Vector(0, 0),
			appliedForce: new Vector(0, 0),
			linearVelocity: new Vector(0, 0),
			linearAcceleration: new Vector(0, 0)
		})
	)
}