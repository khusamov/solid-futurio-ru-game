import {FunctionComponent, useState, WheelEvent} from 'react';
import {useRequestAnimationFrame, Vector} from 'khusamov-base-types';
import {IUniversalObject} from 'khusamov-universal-object';
import {resolve} from 'khusamov-inversion-of-control';
import {TransformableAdapter} from 'khusamov-mechanical-motion';
import GameObjectAdapter from '../../game/gameObject/GameObjectAdapter';
import RenderableAdapter from '../../game/gameObject/RenderableAdapter';
import ToroidalSurfaceAdapter from '../../game/gameObject/ToroidalSurfaceAdapter';
import {TGameObjectList} from '../../game/types';
import ToroidalRender from '../ToroidalRender';
import Spaceship from '../Spaceship';
import Canvas, {CanvasSizeContext} from '../Canvas';
import Params from '../Params';
import Star from '../Star';
import {ApplicationStyle} from './Application.module.scss'

type TUniversalRenderComponent = FunctionComponent<{object: IUniversalObject}>
const renderableMap: Record<string, TUniversalRenderComponent> = {
	Spaceship,
	Star
}

export default function Application() {
	const [fps] = useRequestAnimationFrame()
	const gameObjectList = resolve<TGameObjectList>('GameObjectList')
	const selectedGameObject = resolve<IUniversalObject>('SelectedGameObject')
	const selectedGameObjectTransformable = new TransformableAdapter(selectedGameObject)

	const theGameWorld = new ToroidalSurfaceAdapter(resolve<IUniversalObject>('GameObject', 'theGameWorld'))

	const additionalParameters = [{
		title: 'FPS',
		unit: 'Кадры в секунды',
		value: fps.toFixed(0)
	}]

	const offset = selectedGameObjectTransformable.position.inverse // Камера движется за кораблем.

	const isIRenderablePredicate = (object: IUniversalObject) => {
		const gameObject = new GameObjectAdapter(object)
		return gameObject.kind.includes('IRenderable')
	}

	const [scale, setScale] = useState(2)

	const onWheel = (event: WheelEvent<HTMLDivElement>) => {
		setScale(scale => {
			const scaleInterval = event.deltaY * 0.003
			let newScale = scale - scaleInterval
			newScale = newScale < 0.4 ? 0.4 : newScale
			newScale = newScale > 4 ? 4 : newScale
			return newScale
		})
	}

	return (
		<div className={ApplicationStyle} onWheel={onWheel}>
			<Params object={selectedGameObject} additionalParameters={additionalParameters}/>
			<Canvas
				offset={offset}
				scale={new Vector(scale, scale)} // Уменьшаем обзор камеры.
			>
				<CanvasSizeContext.Consumer>
					{canvasSize => (
						gameObjectList.filter(isIRenderablePredicate).map((object, index) => {
							const renderable = new RenderableAdapter(object)
							const RenderComponent = renderableMap[renderable.renderComponent]
							if (!RenderComponent) {
								throw new Error(`Не найден компонент '${renderable.renderComponent}'`)
							}
							const transformable = new TransformableAdapter(object)

							const isVisible = (position: Vector) => {
								// Внимание, в SVG.transform действия производится задом наперед!
								position = position
									.translate(offset)
									.scale(new Vector(scale, scale))
									.translate(new Vector(canvasSize.width / 2, canvasSize.height / 2))
								return (
									position.x >= 0 && position.x <= canvasSize.width &&
									position.y >= 0 && position.y <= canvasSize.height
								)
							}

							return (
								<ToroidalRender
									key={index}
									isVisible={isVisible}
									position={transformable.position}
									toroidalSurfaceSize={theGameWorld.size}
								>
									<RenderComponent object={object}/>
								</ToroidalRender>
							)
						})
					)}
				</CanvasSizeContext.Consumer>
			</Canvas>
		</div>
	)
}