import createTransformForceStartMessage from './createTransformForceStartMessage';
import createTransformForceStopMessage from './createTransformForceStopMessage';
import {IUniversalObject, KeyUpDownProcessor, Queue, Vector} from 'khusamov-base-types';

// TODO Оказывается одна и та же команда может быть вызвана несколько раз!

export default function createKeyboardHandlers(keyUpDownProcessor: KeyUpDownProcessor, agentMessageQueue: Queue<IUniversalObject>) {
	document.onkeydown = event => {
		keyUpDownProcessor.onKeyDown(event, () => {
			switch (event.code) {
				case 'KeyW':
					agentMessageQueue.enqueue(createTransformForceStartMessage(new Vector(100, 100)))
					break
				case 'KeyS':
					agentMessageQueue.enqueue(createTransformForceStartMessage(new Vector(-100, -100)))
					break
			}
		})
	}

	document.onkeyup = event => {
		keyUpDownProcessor.onKeyUp(event, () => {
			switch (event.code) {
				case 'KeyW':
					agentMessageQueue.enqueue(createTransformForceStopMessage())
					break
				case 'KeyS':
					agentMessageQueue.enqueue(createTransformForceStopMessage())
					break
			}
		})
	}
}