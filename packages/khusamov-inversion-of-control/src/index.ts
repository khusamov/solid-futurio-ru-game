export {default as IResolverContext} from './inversionOfControl/IResolverContext'
export {default as register} from './inversionOfControl/register'
export {default as resolve} from './inversionOfControl/resolve'
export {TResolverFunction, TResolveParameters} from './inversionOfControl/types'

// Проверка на повторную загрузку пакета.
// Нельзя класс IoC определять более одного раза.

const _global = typeof window === 'undefined' ? global : window

const inversionOfControlPackageName = 'khusamov-inversion-of-control'
const inversionOfControlPackageSymbol = Symbol.for(inversionOfControlPackageName)

if (Reflect.get(_global, inversionOfControlPackageSymbol) === inversionOfControlPackageName) {
	console.warn(`Пакет '${inversionOfControlPackageName}' загружен повторно!`)
}

if (Reflect.get(_global, inversionOfControlPackageSymbol) !== inversionOfControlPackageName) {
	Object.defineProperty(_global, inversionOfControlPackageSymbol, {
		writable: true,
		value: inversionOfControlPackageName
	})
}