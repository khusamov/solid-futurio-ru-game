import {Adapter} from 'khusamov-universal-object';
import {ICobraSpaceship} from './ICobraSpaceship';
import {Vector} from 'khusamov-base-types';

export class CobraSpaceshipAdapter extends Adapter implements ICobraSpaceship {
	public get appliedLeftForce(): Vector {
		return this.universalObject.getValue('appliedLeftForce', new Vector)
	}

	public set appliedLeftForce(value: Vector) {
		this.universalObject.setValue('appliedLeftForce', value)
	}

	public get appliedRightForce(): Vector {
		return this.universalObject.getValue('appliedRightForce', new Vector)
	}

	public set appliedRightForce(value: Vector) {
		this.universalObject.setValue('appliedRightForce', value)
	}

	public get distanceBetweenEngines(): number {
		return this.universalObject.getValue('distanceBetweenEngines', 0)
	}

	public set distanceBetweenEngines(value: number) {
		this.universalObject.setValue('distanceBetweenEngines', value)
	}
}