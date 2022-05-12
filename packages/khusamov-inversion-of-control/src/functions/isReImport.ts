export function isReImport(packageName: string) {
	const _global = typeof window === 'undefined' ? global : window
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