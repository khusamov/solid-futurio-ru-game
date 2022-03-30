import syntaxErrorHandler from './syntaxErrorHandler';

export default function execActionScript(source: string | undefined) {
	if (source) {
		try {
			const code = new Function('', source)
			code()
		} catch (error) {
			if (error instanceof SyntaxError) {
				syntaxErrorHandler(error, source)
			}
			throw error
		}
	}
}