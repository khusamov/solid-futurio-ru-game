import {Adapter} from 'khusamov-universal-object';
import {IRotable} from './IRotable';
import {Vector} from 'khusamov-base-types';

export class RotableAdapter extends Adapter implements IRotable {
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

	public get appliedForce(): Vector {
		return this.universalObject.getValue('appliedForce', new Vector)
	}

	public set appliedForce(value: Vector) {
		this.universalObject.setValue('appliedForce', value)
	}

	public get appliedForceRadius(): number {
		return this.universalObject.getValue('appliedForceRadius', 0)
	}

	public set appliedForceRadius(value: number) {
		this.universalObject.setValue('appliedForceRadius', value)
	}

	public get rotationalInertia(): number {
		return this.universalObject.getValue('rotationalInertia', 0)
	}

	public set rotationalInertia(value: number) {
		this.universalObject.setValue('rotationalInertia', value)
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
}