import {GamePlugin} from '../classes/GamePlugin';
import {resolve} from 'khusamov-inversion-of-control';
import {TGameObjectList} from '../game/types';
import {createUniversalObject} from 'khusamov-universal-object';
import IGameObject from '../game/gameObject/IGameObject';
import IToroidalSurface from '../game/gameObject/IToroidalSurface';

export class GameWorldPlugin extends GamePlugin {
	init(): void {
		const gameObjectList = resolve<TGameObjectList>('GameObjectList')

		gameObjectList.push(
			createUniversalObject<IGameObject & IToroidalSurface>({
				name: 'theGameWorld',
				kind: ['IGameObject', 'IToroidalSurface'],
				size: {
					width: 3000,
					height: 3000
				}
			})
		)
	}
}