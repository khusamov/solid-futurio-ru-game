import {Vector, Vector3} from 'khusamov-base-types';
import {Adapter} from 'khusamov-universal-object';
import {IRotable} from './IRotable';

export class RotableAdapter extends Adapter implements IRotable {
	public get rotableTime(): number {
		return this.universalObject.getValue('rotableTime', 0)
	}

	public set rotableTime(value: number) {
		this.universalObject.setValue('rotableTime', value)
	}

	public get appliedRotationalForce(): Vector {
		return this.universalObject.getValue('appliedRotationalForce', new Vector)
	}

	public set appliedRotationalForce(value: Vector) {
		this.universalObject.setValue('appliedRotationalForce', value)
	}

	public get appliedRotationalForcePoint(): Vector {
		return this.universalObject.getValue('appliedRotationalForcePoint', new Vector)
	}

	public set appliedRotationalForcePoint(value: Vector) {
		this.universalObject.setValue('appliedRotationalForcePoint', value)
	}

	public get angularAcceleration(): number {
		return this.universalObject.getValue('angularAcceleration', 0)
	}

	public set angularAcceleration(value: number) {
		this.universalObject.setValue('angularAcceleration', value)
	}

	public get angularVelocity(): number {
		return this.universalObject.getValue('angularVelocity', 0)
	}

	public set angularVelocity(value: number) {
		this.universalObject.setValue('angularVelocity', value)
	}

	public get rotationalInertia(): number {
		return this.universalObject.getValue('rotationalInertia', 0)
	}

	public set rotationalInertia(value: number) {
		this.universalObject.setValue('rotationalInertia', value)
	}

	public get torque(): Vector3 {
		return this.universalObject.getValue('torque', new Vector3)
	}

	public set torque(value: Vector3) {
		this.universalObject.setValue('torque', value)
	}
}