import {GamePlugin} from '../../classes/GamePlugin';
import {register, resolve} from 'khusamov-inversion-of-control';
import gameObjectResolver from './gameObjectResolver';
import gameWorldSizeResolver from './gameWorldSizeResolver';
import {IUniversalObject} from 'khusamov-universal-object';
import {TGameObjectList} from '../../game/types';
import createGameTimer from './createGameTimer';

const DEBUG = false

export class GlobalGameObjectPlugin extends GamePlugin {
	init(): void {
		register('GameObject', gameObjectResolver)
		register('GameWorldSize', gameWorldSizeResolver)
		register('SelectedGameObject', () => resolve<IUniversalObject>('GameObject', 'theSpaceship'))
		const gameObjectList: TGameObjectList = []
		const gameTimer = createGameTimer(DEBUG)
		register('GameObjectList', () => gameObjectList)
		register('GameTimer', () => gameTimer)
	}
}