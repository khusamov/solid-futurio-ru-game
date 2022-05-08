import {ISize} from 'khusamov-base-types';
import {IUniversalObject} from 'khusamov-universal-object';
import IToroidalSurface from './IToroidalSurface';

const NULL_SIZE: ISize = {
	width: 0,
	height: 0
}

export default class ToroidalSurfaceAdapter implements IToroidalSurface {
	public constructor(private universalObject: IUniversalObject) {}

	public get size(): ISize {
		return this.universalObject.getValue('size', NULL_SIZE)
	}

	public set size(value: ISize) {
		this.universalObject.setValue('size', value)
	}
}