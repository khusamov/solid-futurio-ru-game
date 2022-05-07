import {Vector} from 'khusamov-base-types';
import {Adapter} from 'khusamov-universal-object';
import ITransformable from './ITransformable';

export default class TransformableAdapter extends Adapter implements ITransformable {
	public get position(): Vector {
		return this.universalObject.getValue('position', new Vector)
	}

	public set position(value: Vector) {
		this.universalObject.setValue('position', value)
	}

	public get rotation(): Vector {
		return this.universalObject.getValue('rotation', new Vector)
	}

	public set rotation(value: Vector) {
		this.universalObject.setValue('rotation', value)
	}
}