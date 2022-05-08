import {FunctionComponent} from 'react';
import {IUniversalObject} from 'khusamov-universal-object';
import {resolve} from 'khusamov-inversion-of-control';
import {MovableAdapter} from 'khusamov-mechanical-motion';
import useRequestAnimationFrame from '../../game/useRequestAnimationFrame';
import GameObjectAdapter from '../../game/gameObject/GameObjectAdapter';
import RenderableAdapter from '../../game/gameObject/RenderableAdapter';
import {TGameObjectList} from '../../game/types';
import ToroidalRender from '../ToroidalRender';
import {CanvasSizeContext} from '../Canvas';
import Spaceship from '../Spaceship';
import Canvas from '../Canvas';
import styles from './Application.module.scss'
import onCanvasRezise from './onCanvasRezise';
import Params from '../Params';
import Star from '../Star';
import {Vector} from 'khusamov-base-types';

type TUniversalRenderComponent = FunctionComponent<{object: IUniversalObject}>
const renderableMap: Record<string, TUniversalRenderComponent> = {
	Spaceship,
	Star
}

export default function Application() {
	useRequestAnimationFrame()
	const gameObjectList = resolve<TGameObjectList>('GameObjectList')
	const selectedGameObject = resolve<IUniversalObject>('SelectedGameObject')
	const selectedGameObjectMovable = new MovableAdapter(selectedGameObject)
	return (
		<div className={styles.Application}>
			<Params object={selectedGameObject}/>
			<Canvas
				onResize={onCanvasRezise}
				offset={selectedGameObjectMovable.position.inverse} // Камера движется за кораблем.
				scale={new Vector(3, 3)} // Уменьшаем обзор камеры.
			>
				<CanvasSizeContext.Consumer>
					{canvasSize => (
						gameObjectList.map(object => {
							const gameObject = new GameObjectAdapter(object)
							if (gameObject.kind.includes('IRenderable')) {
								const renderable = new RenderableAdapter(object)
								const RenderComponent = renderableMap[renderable.renderComponent]
								if (!RenderComponent) return null
								const movable = new MovableAdapter(object)
								return (
									<ToroidalRender position={movable.position} toroidalSurfaceSize={canvasSize}>
										<RenderComponent object={object}/>
									</ToroidalRender>
								)
							}
							return null
						})
					)}
				</CanvasSizeContext.Consumer>
			</Canvas>
		</div>
	)
}