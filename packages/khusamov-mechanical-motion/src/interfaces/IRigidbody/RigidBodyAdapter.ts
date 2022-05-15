import {IRigidBody} from './IRigidBody';
import {Adapter} from 'khusamov-universal-object';
import {Vector} from 'khusamov-base-types';

export class RigidBodyAdapter extends Adapter implements IRigidBody {
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
}