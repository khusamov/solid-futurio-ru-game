import {assert} from 'chai';
import {Container, RepeatedRegisteringDependencyError} from '../src';

describe('Container', () => {
	it('register()', () => {
		Container.register('MyDependency1', () => {})
	})

	it('resolve()', () => {
		function myDependencyResolver(): string[] {
			return ['Apple', 'iPhone', 'iPad']
		}

		Container.register('MyDependency', myDependencyResolver)
		const myDependency = Container.resolve<string[]>('MyDependency')

		assert.deepEqual(myDependency, ['Apple', 'iPhone', 'iPad'])
	})

	it('RepeatedRegisteringDependencyError', () => {
		assert.throw(
			() => {
				Container.register('RepeatedRegisteringDependencyError1', () => {})
				Container.register('RepeatedRegisteringDependencyError1', () => {})
			},
			RepeatedRegisteringDependencyError,
			`InversionOfControl: Зависимость 'RepeatedRegisteringDependencyError1' уже зарегистрирована`
		)
	})
})