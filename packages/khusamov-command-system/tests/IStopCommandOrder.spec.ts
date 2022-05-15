import {assert} from 'chai';
import {IStoppable} from 'khusamov-base-types';
import {register, resolve} from 'khusamov-inversion-of-control';
import {IUniversalObject, UniversalObject} from 'khusamov-universal-object';
import {ICommand, IStopCommandOrder, stopCommandResolver} from '../src';

describe('IStopCommandOrder', () => {
	it('Sample', () => {
		register('StopCommand', stopCommandResolver)

		const testObject = {
			isStopped: false
		}

		const stoppableMap: Map<string, ICommand & IStoppable> = new Map

		function gameObjectResolver(name: string): IUniversalObject {
			const object = new UniversalObject
			stoppableMap.set('IncreaseLinearVelocityCommand', {
				execute() {},
				stop() {
					testObject.isStopped = true
				}
			})
			object.setValue('stoppableMap', stoppableMap)
			object.setValue('name', name)
			return object
		}

		register('GameObject', gameObjectResolver)

		const stopCommandOrder: IStopCommandOrder<typeof gameObjectResolver> = {
			type: 'StopCommand',
			targetObject: ['GameObject', 'theSpaceship'],
			commandName: 'IncreaseLinearVelocityCommand'
		}

		const stopCommand = resolve<ICommand>(stopCommandOrder.type, stopCommandOrder)
		stopCommand.execute()

		assert.equal(testObject.isStopped, true)
		assert.equal(stoppableMap.has('IncreaseLinearVelocityCommand'), false)
	})
})