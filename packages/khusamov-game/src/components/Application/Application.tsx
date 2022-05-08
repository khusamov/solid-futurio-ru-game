import {FunctionComponent} from 'react';
import {useRequestAnimationFrame, Vector} from 'khusamov-base-types';
import {IUniversalObject} from 'khusamov-universal-object';
import {resolve} from 'khusamov-inversion-of-control';
import {MovableAdapter} from 'khusamov-mechanical-motion';
import GameObjectAdapter from '../../game/gameObject/GameObjectAdapter';
import RenderableAdapter from '../../game/gameObject/RenderableAdapter';
import ToroidalSurfaceAdapter from '../../game/gameObject/ToroidalSurfaceAdapter';
import {TTargetObjectSearchParams} from '../../game/order/IStartMoveTransformOrder';
import {TGameObjectList} from '../../game/types';
import ToroidalRender from '../ToroidalRender';
import Spaceship from '../Spaceship';
import Canvas from '../Canvas';
import Params from '../Params';
import Star from '../Star';
import styles from './Application.module.scss'

type TUniversalRenderComponent = FunctionComponent<{object: IUniversalObject}>
const renderableMap: Record<string, TUniversalRenderComponent> = {
	Spaceship,
	Star
}

export default function Application() {
	const [fps] = useRequestAnimationFrame()
	const gameObjectList = resolve<TGameObjectList>('GameObjectList')
	const selectedGameObject = resolve<IUniversalObject>('SelectedGameObject')
	const selectedGameObjectMovable = new MovableAdapter(selectedGameObject)

	const theGameWorld = (
		new ToroidalSurfaceAdapter(
			resolve<IUniversalObject, [TTargetObjectSearchParams]>(
				'GameObject',
				{
					type: 'GameObject',
					name: 'theGameWorld'
				}
			)
		)
	)

	const additionalParameters = [{
		title: 'FPS',
		unit: 'Кадры в секунды',
		value: fps.toFixed(0)
	}]

	const offset = selectedGameObjectMovable.position.inverse // Камера движется за кораблем.

	return (
		<div className={styles.Application}>
			<Params object={selectedGameObject} additionalParameters={additionalParameters}/>
			<Canvas
				offset={offset}
				scale={new Vector(2, 2)} // Уменьшаем обзор камеры.
			>
				{gameObjectList.map(object => {
					const gameObject = new GameObjectAdapter(object)
					if (gameObject.kind.includes('IRenderable')) {
						const renderable = new RenderableAdapter(object)
						const RenderComponent = renderableMap[renderable.renderComponent]
						if (!RenderComponent) {
							throw new Error(`Не найден компонент '${renderable.renderComponent}'`)
						}
						const movable = new MovableAdapter(object)
						return (
							<ToroidalRender position={movable.position} toroidalSurfaceSize={theGameWorld.size}>
								<RenderComponent object={object}/>
							</ToroidalRender>
						)
					}
					return null
				})}
			</Canvas>
		</div>
	)
}