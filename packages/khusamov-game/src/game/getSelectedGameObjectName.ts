import {resolve} from 'khusamov-inversion-of-control';
import {IUniversalObject} from 'khusamov-universal-object';
import GameObjectAdapter from './gameObject/GameObjectAdapter';

export default function getSelectedGameObjectName(): string {
	const selectedGameObject = resolve<IUniversalObject>('SelectedGameObject')
	return new GameObjectAdapter(selectedGameObject).name
}