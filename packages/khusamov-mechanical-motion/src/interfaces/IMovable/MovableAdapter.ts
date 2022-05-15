import {Vector} from 'khusamov-base-types';
import {Adapter} from 'khusamov-universal-object';
import {IMovable} from './IMovable';

export class MovableAdapter extends Adapter implements IMovable {
	public get movableTime(): number {
		return this.universalObject.getValue('movableTime', 0)
	}

	public set movableTime(value: number) {
		this.universalObject.setValue('movableTime', value)
	}

	public get linearAcceleration(): Vector {
		return this.universalObject.getValue('linearAcceleration', new Vector)
	}

	public set linearAcceleration(value: Vector) {
		this.universalObject.setValue('linearAcceleration', value)
	}

	public get linearVelocity(): Vector {
		return this.universalObject.getValue('linearVelocity', new Vector)
	}

	public set linearVelocity(value: Vector) {
		this.universalObject.setValue('linearVelocity', value)
	}
}