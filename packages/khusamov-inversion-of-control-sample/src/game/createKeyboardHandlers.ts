import {Angle, IQueue, KeyUpDownProcessor, onKeyDown, onKeyUp, Vector} from 'khusamov-base-types';
import {IUniversalObject} from 'khusamov-universal-object';
import createTransformForceStartOrder from './createTransformForceStartOrder';
import createTransformForceStopMessage from './createTransformForceStopMessage';

const nullVector = new Vector
const rotateIncrement = Angle.toRadian(1)
const lengthIncrement = 200

export default function createKeyboardHandlers(keyUpDownProcessor: KeyUpDownProcessor, orderQueue: IQueue<IUniversalObject>) {
	document.onkeydown = onKeyDown(event => {
		switch (event.code) {
			case 'KeyW':
				orderQueue.enqueue(createTransformForceStartOrder('IncreaseForce', nullVector, 0, 1, lengthIncrement))
				break
			case 'KeyS':
				orderQueue.enqueue(createTransformForceStartOrder('DecreaseForce', nullVector, 0, 1, -lengthIncrement))
				break
			case 'KeyA':
				orderQueue.enqueue(createTransformForceStartOrder('ClockwiseRotateForce', new Vector(0, 0), -rotateIncrement))
				break
			case 'KeyD':
				orderQueue.enqueue(createTransformForceStartOrder('CounterclockwiseRotateForce', new Vector(0, 0), rotateIncrement))
				break
		}
	})
	document.onkeydown = onKeyUp(event => {
		switch (event.code) {
			case 'KeyW':
				orderQueue.enqueue(createTransformForceStopMessage('IncreaseForce'))
				break
			case 'KeyS':
				orderQueue.enqueue(createTransformForceStopMessage('DecreaseForce'))
				break
			case 'KeyA':
				orderQueue.enqueue(createTransformForceStopMessage('ClockwiseRotateForce'))
				break
			case 'KeyD':
				orderQueue.enqueue(createTransformForceStopMessage('CounterclockwiseRotateForce'))
				break
		}
	})
}