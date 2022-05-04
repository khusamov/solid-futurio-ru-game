import {ISize} from 'khusamov-base-types';
import {IUniversalObject} from 'khusamov-universal-object';
import IToroidalSurface from './IToroidalSurface';

export default class ToroidalSurfaceAdapter implements IToroidalSurface {
	public constructor(private universalObject: IUniversalObject) {}

	public get size(): ISize {
		return this.universalObject.getValue('size', {
			width: 0,
			height: 0
		})
	}

	public set size(value: ISize) {
		this.universalObject.setValue('size', value)
	}
}