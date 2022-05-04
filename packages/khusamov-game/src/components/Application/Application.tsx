import {FunctionComponent} from 'react';
import {IUniversalObject} from 'khusamov-universal-object';
import {resolve} from 'khusamov-inversion-of-control';
import useRequestAnimationFrame from '../../game/useRequestAnimationFrame';
import GameObjectAdapter from '../../game/gameObject/GameObjectAdapter';
import RenderableAdapter from '../../game/gameObject/RenderableAdapter';
import {TGameObjectList} from '../../game/types';
import Spaceship from '../Spaceship';
import Canvas from '../Canvas';
import styles from './Application.module.scss'
import onCanvasResize from './onCanvasResize';

type TUniversalRenderComponent = FunctionComponent<{object: IUniversalObject}>
const renderableMap: Record<string, TUniversalRenderComponent> = {
	Spaceship
}

export default function Application() {
	useRequestAnimationFrame()
	const gameObjectList = resolve<TGameObjectList>('GameObjectList')
	return (
		<div className={styles.Application}>
			<Canvas onResize={onCanvasResize}>
				{gameObjectList.map(object => {
					const gameObject = new GameObjectAdapter(object)
					if (gameObject.kind && gameObject.kind.includes('IRenderable')) {
						const renderable = new RenderableAdapter(object)
						const RenderComponent = renderableMap[renderable.renderComponent]
						return <RenderComponent object={object}/>
					}
					return null
				})}
			</Canvas>
		</div>
	)
}