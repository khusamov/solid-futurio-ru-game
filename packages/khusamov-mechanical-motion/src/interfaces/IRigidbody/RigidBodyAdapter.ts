import {IRigidBody} from './IRigidBody';
import {Adapter} from 'khusamov-universal-object';

export class RigidBodyAdapter extends Adapter implements IRigidBody {
	public get mass(): number {
		return this.universalObject.getValue('mass', 1)
	}

	public set mass(value: number) {
		this.universalObject.setValue('mass', value)
	}
}