import {findUniversalObject, IUniversalObject} from 'khusamov-universal-object';
import {resolve} from 'khusamov-inversion-of-control';
import {TGameObjectList} from '../types';

export type TGameObjectResolver = typeof gameObjectResolver

export default function gameObjectResolver(gameObjectName: string): IUniversalObject | undefined {
	return findUniversalObject(
		resolve<TGameObjectList>('GameObjectList'),
		{
			name: gameObjectName
		}
	)
}