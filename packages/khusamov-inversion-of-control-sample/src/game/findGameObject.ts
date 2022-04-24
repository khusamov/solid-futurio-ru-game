import {IUniversalObject} from 'khusamov-base-types';
import IGameObject from './IGameObject';

type TGameObjectList = IUniversalObject[]
type TParams = Partial<IGameObject>

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