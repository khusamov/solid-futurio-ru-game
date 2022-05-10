import {ISize} from 'khusamov-base-types';
import {Adapter} from 'khusamov-universal-object';
import IToroidalSurface from './IToroidalSurface';

const NULL_SIZE: ISize = {
	width: 0,
	height: 0
}

export default class ToroidalSurfaceAdapter extends Adapter implements IToroidalSurface {
	public get size(): ISize {
		return this.universalObject.getValue('size', NULL_SIZE)
	}

	public set size(value: ISize) {
		this.universalObject.setValue('size', value)
	}
}