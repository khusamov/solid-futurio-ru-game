import {ISize} from 'khusamov-base-types';
import {resolve} from 'khusamov-inversion-of-control';
import {IUniversalObject} from 'khusamov-universal-object';
import ToroidalSurfaceAdapter from '../../game/gameObject/ToroidalSurfaceAdapter';

/**
 * При изменении размеров холста игры (игрового поля) необходимо поменять размеры игрового мира.
 * Используется для реализации пространства типа бублик.
 * @param size
 */
export default function onCanvasRezise(size: ISize) {
	const theGameWorld = new ToroidalSurfaceAdapter(resolve<IUniversalObject>('GameObject', 'theGameWorld'))
	theGameWorld.size = Object.assign({}, size)
}