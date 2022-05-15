import {Adapter} from 'khusamov-universal-object';
import {IRotable} from './IRotable';

export class RotableAdapter extends Adapter implements IRotable {
	public get rotableTime(): number {
		return this.universalObject.getValue('rotableTime', 0)
	}

	public set rotableTime(value: number) {
		this.universalObject.setValue('rotableTime', value)
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