import createTransformForceStartMessage from './createTransformForceStartMessage';
import createTransformForceStopMessage from './createTransformForceStopMessage';
import {Angle, IUniversalObject, KeyUpDownProcessor, Queue, Vector} from 'khusamov-base-types';

const nullVector = new Vector
const rotateIncrement = Angle.toRadian(1)
const lengthIncrement = 10

export default function createKeyboardHandlers(keyUpDownProcessor: KeyUpDownProcessor, agentMessageQueue: Queue<IUniversalObject>) {
	document.onkeydown = event => {
		keyUpDownProcessor.onKeyDown(event, () => {
			switch (event.code) {
				case 'KeyW':
					agentMessageQueue.enqueue(createTransformForceStartMessage('IncreaseForce', nullVector, 0, 1, lengthIncrement))
					break
				case 'KeyS':
					agentMessageQueue.enqueue(createTransformForceStartMessage('DecreaseForce', nullVector, 0, 1, -lengthIncrement))
					break
				case 'KeyA':
					agentMessageQueue.enqueue(createTransformForceStartMessage('СlockwiseRotateForce', new Vector(0, 0), rotateIncrement))
					break
				case 'KeyD':
					agentMessageQueue.enqueue(createTransformForceStartMessage('СounterclockwiseRotateForce', new Vector(0, 0), -rotateIncrement))
					break
			}
		})
	}

	document.onkeyup = event => {
		keyUpDownProcessor.onKeyUp(event, () => {
			switch (event.code) {
				case 'KeyW':
					agentMessageQueue.enqueue(createTransformForceStopMessage('IncreaseForce'))
					break
				case 'KeyS':
					agentMessageQueue.enqueue(createTransformForceStopMessage('DecreaseForce'))
					break
				case 'KeyA':
					agentMessageQueue.enqueue(createTransformForceStopMessage('СlockwiseRotateForce'))
					break
				case 'KeyD':
					agentMessageQueue.enqueue(createTransformForceStopMessage('СounterclockwiseRotateForce'))
					break
			}
		})
	}
}