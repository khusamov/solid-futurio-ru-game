import IUniversalObject from '../types/IUniversalObject';
import Adapter from '../types/Adapter';

type IT<T extends abstract new (...args: any) => any> = InstanceType<T>
type AC = typeof Adapter

/**
 * Позволяет создать один адаптер на основе нескольких классов разных адаптеров.
 * @param universalObject
 * @param AC1
 */
export default function createAdapter<A1 extends AC>(universalObject: IUniversalObject, AC1: A1): IT<A1>
export default function createAdapter<A1 extends AC, A2 extends AC>(universalObject: IUniversalObject, AC1: A1, AC2: A2): IT<A1> & IT<A2>
export default function createAdapter<A1 extends AC, A2 extends AC, A3 extends AC>(universalObject: IUniversalObject, AC1: A1, AC2: A2, AC3: A3): IT<A1> & IT<A2> & IT<A3>
export default function createAdapter<A1 extends AC, A2 extends AC, A3 extends AC, A4 extends AC>(universalObject: IUniversalObject, AC1: A1, AC2: A2, AC3: A3, AC4: A4): IT<A1> & IT<A2> & IT<A3> & IT<A4>
export default function createAdapter<A1 extends AC, A2 extends AC, A3 extends AC, A4 extends AC, A5 extends AC>(universalObject: IUniversalObject, AC1: A1, AC2: A2, AC3: A3, AC4: A4, AC5: A5): IT<A1> & IT<A2> & IT<A3> & IT<A4> & IT<A5>
export default function createAdapter(universalObject: IUniversalObject, ...adapterClasses: Array<typeof Adapter>): any {
	if (adapterClasses.length === 0) {
		throw new Error('Не определены классы адаптеров')
	}
	if (adapterClasses.length === 1) {
		const AdapterClass = adapterClasses[0]
		if (!AdapterClass) throw new Error('Не определен класс адаптера')
		return new AdapterClass(universalObject)
	} else {
		return new Proxy(adapterClasses.map(AdapterClass => new AdapterClass(universalObject)), {
			get: proxyHandlerGet,
			set: proxyHandlerSet
		})
	}
}

function proxyHandlerGet(adapters: any[], property: string | symbol): any {
	for (const adapter of adapters) {
		if (property in adapter) {
			const value = Reflect.get(adapter, property)
			return (
				typeof value === 'function'
					? value.bind(adapter)
					: value
			)
		}
	}
}

function proxyHandlerSet(adapters: any[], property: string | symbol, value: any): boolean {
	for (const adapter of adapters) {
		if (property in adapter) {
			return Reflect.set(adapter, property, value)
		}
	}
	return false
}