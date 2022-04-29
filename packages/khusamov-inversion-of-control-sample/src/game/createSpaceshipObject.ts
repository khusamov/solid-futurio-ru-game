import {Vector} from 'khusamov-base-types';
import {createUniversalObject, IUniversalObject} from 'khusamov-universal-object';
import {IMovable} from 'khusamov-game-command-system';
import IGameObject from './IGameObject';

interface ISpaceship extends IGameObject, IMovable {}

const SPACESHIP_DEFAULT: ISpaceship = {
	name: 'theSpaceship',
	time: 0,
	mass: 1000,
	position: new Vector(0, 0),
	appliedForce: new Vector(0, 0),
	linearVelocity: new Vector(0, 0),
	linearAcceleration: new Vector(0, 0)
}

export default function createSpaceshipObject(params: Partial<ISpaceship> = {}): IUniversalObject {
	return (
		createUniversalObject<ISpaceship>(
			Object.assign(
				{},
				SPACESHIP_DEFAULT,
				params
			)
		)
	)
}

