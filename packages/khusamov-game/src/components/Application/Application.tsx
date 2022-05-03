import {resolve} from 'khusamov-inversion-of-control';
import {IMovable, MovableAdapter} from 'khusamov-mechanical-motion';
import useRequestAnimationFrame from '../../game/useRequestAnimationFrame';
import {TGameObjectList} from '../../game/types';
import GameObjectAdapter from '../../game/gameObject/GameObjectAdapter';
import Canvas from '../Canvas';
import Movable from '../Movable';
import styles from './Application.module.scss'

export default function Application() {
	useRequestAnimationFrame()
	const gameObjectList = resolve<TGameObjectList>('GameObjectList')
	return (
		<div className={styles.Application}>
			<Canvas>
				{gameObjectList.map(object => {
					const gameObject = new GameObjectAdapter(object)
					if (gameObject.kind && gameObject.kind.includes('IMovable')) {
						return <Movable movable={new MovableAdapter(object)}/>
					}
					return null
				})}
			</Canvas>
		</div>
	)
}