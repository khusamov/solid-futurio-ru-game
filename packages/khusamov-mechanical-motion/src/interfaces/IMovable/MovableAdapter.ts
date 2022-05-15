import {Vector} from 'khusamov-base-types';
import {Adapter} from 'khusamov-universal-object';
import {IMovable} from './IMovable';

export class MovableAdapter extends Adapter implements IMovable {
	public get time(): number {
		return this.universalObject.getValue('time', 0)
	}

	public set time(value: number) {
		this.universalObject.setValue('time', value)
	}

	public get mass(): number {
		return this.universalObject.getValue('mass', 1)
	}

	public set mass(value: number) {
		this.universalObject.setValue('mass', value)
	}

	public get position(): Vector {
		return this.universalObject.getValue('position', new Vector)
	}

	public set position(value: Vector) {
		this.universalObject.setValue('position', value)
	}

	public get appliedForce(): Vector {
		return this.universalObject.getValue('appliedForce', new Vector)
	}

	public set appliedForce(value: Vector) {
		this.universalObject.setValue('appliedForce', value)
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