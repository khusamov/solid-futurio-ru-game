import {Vector} from 'khusamov-base-types';
import {IUniversalObject} from 'khusamov-universal-object';
import IMovable from './IMovable';

type Adapter<T> = Partial<T>

export default class MovableAdapter implements Adapter<IMovable> {
	constructor(private universalObject: IUniversalObject) {}

	public get time(): number | undefined {
		return this.universalObject.getValue('time')
	}

	public set time(value: number | undefined) {
		this.universalObject.setValue('time', value)
	}

	public get mass(): number | undefined {
		return this.universalObject.getValue('mass')
	}

	public set mass(value: number | undefined) {
		this.universalObject.setValue('mass', value)
	}

	public get position(): Vector | undefined {
		return this.universalObject.getValue('position')
	}

	public set position(value: Vector | undefined) {
		this.universalObject.setValue('position', value)
	}

	public get appliedForce(): Vector | undefined {
		return this.universalObject.getValue('appliedForce')
	}

	public set appliedForce(value: Vector | undefined) {
		this.universalObject.setValue('appliedForce', value)
	}

	public get linearAcceleration(): Vector | undefined {
		return this.universalObject.getValue('linearAcceleration')
	}

	public set linearAcceleration(value: Vector | undefined) {
		this.universalObject.setValue('linearAcceleration', value)
	}

	public get linearVelocity(): Vector | undefined {
		return this.universalObject.getValue('linearVelocity')
	}

	public set linearVelocity(value: Vector | undefined) {
		this.universalObject.setValue('linearVelocity', value)
	}
}