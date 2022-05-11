import {Vector} from 'khusamov-base-types';
import {Adapter} from 'khusamov-universal-object';
import ITransformable from './ITransformable';

export default class TransformableAdapter extends Adapter implements ITransformable {
	public get position(): Vector {
		return this.universalObject.getValue('position', new Vector(0, 0))
	}

	public set position(value: Vector) {
		this.universalObject.setValue('position', value)
	}

	public get rotation(): Vector {
		return this.universalObject.getValue('rotation', new Vector(0, 0))
	}

	public set rotation(value: Vector) {
		this.universalObject.setValue('rotation', value)
	}

	public get scale(): Vector {
		return this.universalObject.getValue('scale', new Vector(1, 1))
	}

	public set scale(value: Vector) {
		this.universalObject.setValue('scale', value)
	}
}