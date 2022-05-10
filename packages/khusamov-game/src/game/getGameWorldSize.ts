import {ISize} from 'khusamov-base-types';
import ToroidalSurfaceAdapter from './gameObject/ToroidalSurfaceAdapter';
import {resolve} from 'khusamov-inversion-of-control';
import {IUniversalObject} from 'khusamov-universal-object';

export default function getGameWorldSize(): ISize {
	const theGameWorldObject = resolve<IUniversalObject>('GameObject', 'theGameWorld')
	const theGameWorld = new ToroidalSurfaceAdapter(theGameWorldObject)
	return theGameWorld.size
}