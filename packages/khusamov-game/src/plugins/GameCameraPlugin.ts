import {GamePlugin} from '../classes/GamePlugin';
import {resolve} from 'khusamov-inversion-of-control';
import {TGameObjectList} from '../game/types';
import {createUniversalObject} from 'khusamov-universal-object';
import IGameObject from '../game/gameObject/IGameObject';
import {ITransformable} from 'khusamov-mechanical-motion';

export class GameCameraPlugin extends GamePlugin {
	init(): void {
		const gameObjectList = resolve<TGameObjectList>('GameObjectList')

		gameObjectList.push(
			createUniversalObject<Partial<IGameObject & ITransformable>>({
				name: 'theCamera',
				kind: ['IGameObject', 'ITransformable']
			})
		)
	}
}