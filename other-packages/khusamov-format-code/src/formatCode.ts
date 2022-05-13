import {format as browserFormat} from 'prettier/standalone'
import {Options, format as nodeFormat} from 'prettier'
import IPrettierPlugins from './IPrettierPlugins'
import prettierOptions from './prettier.options.json'

const isBrowser = new Function('try { return this === window } catch (e) { return false }')()
const format = isBrowser ? browserFormat : nodeFormat

const formatOptions = {
	parser: 'typescript',
	...prettierOptions as Options
}

if (isBrowser) {
	const globalWindow = window as never as Window & IPrettierPlugins
	formatOptions.plugins = globalWindow.prettierPlugins
}

/**
 * Форматирование TypeScript-кода.
 * @param source
 */
export default function formatCode(source: string) {
	return format(source, formatOptions)
}