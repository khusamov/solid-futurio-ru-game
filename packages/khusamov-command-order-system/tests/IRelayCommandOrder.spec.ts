import {assert} from 'chai';
import {ICommand} from 'khusamov-base-types';
import {register, resolve} from 'khusamov-inversion-of-control';
import {createUniversalObject} from 'khusamov-universal-object';
import {IRelayCommandOrder, OrderAdapter, relayCommandResolver, RelayCommandOrderAdapter} from '../src';

describe('IRelayCommandOrder', () => {
	it('Sample', () => {
		register('RelayCommand', relayCommandResolver)

		// Целевой объект.
		const spaceship = {
			linearVelocity: 100
		}

		// Действие для изменения целевого объекта.
		function increaseLinearVelocityActionResolver(increment: number) {
			return () => {
				spaceship.linearVelocity += increment
			}
		}

		register('IncreaseLinearVelocityAction', increaseLinearVelocityActionResolver)

		// Создаем приказ для изменения целевого объекта.
		const relayCommandOrderObject = (
			createUniversalObject<IRelayCommandOrder<typeof increaseLinearVelocityActionResolver>>({
				type: 'RelayCommand',
				name: 'IncreaseLinearVelocityCommand',
				action: ['IncreaseLinearVelocityAction', 100]
			})
		)

		// Выполняем приказ.
		const myCommand = resolve<ICommand>(new OrderAdapter(relayCommandOrderObject).type, relayCommandOrderObject)
		myCommand.execute()

		assert.equal(spaceship.linearVelocity, 200)
	})
	it('RelayCommandOrderAdapter', () => {
		function myActionResolver(increment: number) {return increment}

		const relayCommandOrderObject = (
			createUniversalObject<IRelayCommandOrder<typeof myActionResolver>>({
				type: 'RelayCommand',
				name: 'IncreaseLinearVelocityCommand',
				action: ['IncreaseLinearVelocityAction', 100]
			})
		)

		const relayCommandOrder = new RelayCommandOrderAdapter(relayCommandOrderObject)

		assert.equal(relayCommandOrder.type, 'RelayCommand')
		assert.equal(relayCommandOrder.name, 'IncreaseLinearVelocityCommand')
		assert.deepEqual(relayCommandOrder.action, ['IncreaseLinearVelocityAction', 100])
	})
})