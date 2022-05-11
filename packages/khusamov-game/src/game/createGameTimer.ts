import {resolve} from 'khusamov-inversion-of-control';
import {Timer} from 'khusamov-base-types';
import {TCommandQueue} from 'khusamov-command-system';
import {EventEmitter} from 'events';

export default function createGameTimer(DEBUG: boolean) {
	if (DEBUG) {
		return (
			new Timer(1000, () => {
				const commandQueueEventEmitter = resolve<EventEmitter>('CommandQueue.EventEmitter')
				const commandQueue = resolve<TCommandQueue>('CommandQueue')
				const command = commandQueue.dequeue()
				if (command) {
					console.log(command.name)
					command.execute()
					commandQueueEventEmitter.emit('execute', command)
				}
			})
		)
	} else {
		return (
			new Timer(1, () => {
				const commandQueueEventEmitter = resolve<EventEmitter>('CommandQueue.EventEmitter')
				const commandQueue = resolve<TCommandQueue>('CommandQueue')
				const command = commandQueue.dequeue()
				if (command) {
					command.execute()
					commandQueueEventEmitter.emit('execute', command)
				}
			})
		)
	}
}