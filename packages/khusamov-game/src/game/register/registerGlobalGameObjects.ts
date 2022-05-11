import {createUniversalObject} from 'khusamov-universal-object';
import IGameObject from '../gameObject/IGameObject';
import {ITransformable} from 'khusamov-mechanical-motion';
import IToroidalSurface from '../gameObject/IToroidalSurface';
import {resolve} from 'khusamov-inversion-of-control';
import {TGameObjectList} from '../types';

/**
 * Генерация основных игровых объектов.
 */
export default function registerGlobalGameObjects() {
	const gameObjectList = resolve<TGameObjectList>('GameObjectList')

	gameObjectList.push(
		createUniversalObject<Partial<IGameObject & ITransformable>>({
			name: 'theCamera',
			kind: ['IGameObject', 'ITransformable']
		})
	)

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