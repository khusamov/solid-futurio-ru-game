/**
 * Обработчик синтаксической ошибки в коде source.
 * @param error
 * @param source
 */
export default function syntaxErrorHandler(error: SyntaxError, source: string) {
	console.group('Синтаксическая ошибка')
	console.log(error.message)
	console.log(source)
	console.log(error.stack)
	console.groupEnd()
}