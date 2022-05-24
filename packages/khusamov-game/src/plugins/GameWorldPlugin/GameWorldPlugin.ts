import {resolve} from 'khusamov-inversion-of-control';
import {createUniversalObject} from 'khusamov-universal-object';
import {GamePlugin} from '../../classes/GamePlugin';
import {TGameObjectList} from '../GlobalGameObjectPlugin/types';
import IToroidalSurface from './IToroidalSurface/IToroidalSurface';
import IGameObject from '../GlobalGameObjectPlugin/IGameObject/IGameObject';

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