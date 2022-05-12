import {assert} from 'chai';
import {register, resolve} from '../src';

describe('Sample', () => {
	it('sample', () => {
		// Где-то есть класс Pirat, который был создан неизвестным разработчиком.
		class Pirat {
			constructor(
				private weapons: string[],
				private bomb: number
			) {}
			toString() {
				return `${this.weapons.join()} / ${this.bomb}`
			}
		}

		// Регистрируем зависимость Pirat, которая будет возвращать экземпляр класса Pirat.
		type TPiratResolver = (weapons: string[], bomb: number) => Pirat
		const piratResolver: TPiratResolver = (weapons, bomb) => { return new Pirat(weapons, bomb) }
		register('Pirat', piratResolver)

		// Разрешаем зависимость в строгом (через тип или через функцию) и обычном режиме:
		const pirat1 = resolve<Pirat, TPiratResolver>('Pirat', [], 1)
		const pirat2 = resolve<Pirat, typeof piratResolver>('Pirat', [], 1)
		const pirat3 = resolve<Pirat>('Pirat', [], 1)

		assert.instanceOf(pirat1, Pirat)
		assert.instanceOf(pirat2, Pirat)
		assert.instanceOf(pirat3, Pirat)
	})
})