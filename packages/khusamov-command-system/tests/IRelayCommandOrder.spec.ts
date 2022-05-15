import {assert} from 'chai';
import {register, resolve, TResolveParameters} from 'khusamov-inversion-of-control';
import {ICommand, IRelayCommandOrder, relayCommandResolver} from '../src';

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
		const relayCommandOrder: IRelayCommandOrder<TResolveParameters<typeof increaseLinearVelocityActionResolver>> = {
			type: 'RelayCommand',
			name: 'IncreaseLinearVelocityCommand',
			action: ['IncreaseLinearVelocityAction', 100]
		}

		// Выполняем приказ.
		const myCommand = resolve<ICommand>(relayCommandOrder.type, relayCommandOrder)
		myCommand.execute()

		assert.equal(spaceship.linearVelocity, 200)
	})
	it('RelayCommandOrderAdapter', () => {
		function myActionResolver(increment: number) {return increment}

		const relayCommandOrder: IRelayCommandOrder<TResolveParameters<typeof myActionResolver>> = {
			type: 'RelayCommand',
			name: 'IncreaseLinearVelocityCommand',
			action: ['IncreaseLinearVelocityAction', 100]
		}

		assert.equal(relayCommandOrder.type, 'RelayCommand')
		assert.equal(relayCommandOrder.name, 'IncreaseLinearVelocityCommand')
		assert.deepEqual(relayCommandOrder.action, ['IncreaseLinearVelocityAction', 100])
	})
})