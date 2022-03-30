import syntaxErrorHandler from './syntaxErrorHandler';

export default function execFunctionScript<T>(source: string): T {
	if (!source.trim()) {
		throw new Error('Не задано тело функции')
	}

	try {
		const code = new Function('', `return ${source}`)
		return code()
	} catch (error) {
		if (error instanceof SyntaxError) {
			syntaxErrorHandler(error, source)
		}
		throw error
	}
}