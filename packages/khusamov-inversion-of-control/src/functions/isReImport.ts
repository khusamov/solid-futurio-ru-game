export function isReImport(packageName: string) {

	// TODO Исправить ошибку 'Cannot find name 'global'. Did you mean '_global'?'.
	// Пока не ясно как это реализовать.
	//const _global = typeof window === 'undefined' ? global : window
	const _global = window

	const packageSymbol = Symbol.for(packageName)
	const isReImport = Reflect.get(_global, packageSymbol) === packageName

	if (!isReImport) {
		Object.defineProperty(_global, packageSymbol, {
			writable: true,
			value: packageName
		})
	}

	return isReImport
}