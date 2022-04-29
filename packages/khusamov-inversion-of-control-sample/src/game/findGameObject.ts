import {IUniversalObject} from 'khusamov-universal-object';
import IGameObject from './IGameObject';

type TGameObjectList = IUniversalObject[]
type TParams = Partial<IGameObject>

// TODO Функцию findGameObject следует удалить. Она реализована в khusamov-base-types.

export default function findGameObject(gameObjectList: TGameObjectList, params: TParams): IUniversalObject | undefined {
	return (
		gameObjectList.find(
			gameObject => (
				Object.entries<any>(params).reduce(
					(result: boolean, [key, value]) => result && gameObject.getValue(key) === value,
					true
				)
			)
		)
	)
}

export function findGameObjectByName(gameObjectList: TGameObjectList, name: string) {
	return findGameObject(gameObjectList, {name})
}