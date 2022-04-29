export {default as IResolverContext} from './inversionOfControl/IResolverContext'
export {default as register} from './inversionOfControl/register'
export {default as resolve} from './inversionOfControl/resolve'

// Проверка на повторную загрузку пакета.
// Нельзя класс IoC определять более одного раза.

const inversionOfControlPackageName = 'khusamov-inversion-of-control'
const inversionOfControlPackageSymbol = Symbol.for(inversionOfControlPackageName)

if (Reflect.get(window, inversionOfControlPackageSymbol) === inversionOfControlPackageName) {
	console.warn(`Пакет '${inversionOfControlPackageName}' загружен повторно!`)
}

if (Reflect.get(window, inversionOfControlPackageSymbol) !== inversionOfControlPackageName) {
	Object.defineProperty(window, inversionOfControlPackageSymbol, {
		writable: true,
		value: inversionOfControlPackageName
	})
}