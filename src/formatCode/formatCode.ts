import {format} from 'prettier/standalone'
import {Options} from 'prettier'
import IPrettierPlugins from './IPrettierPlugins'
import prettierOptions from './prettier.options.json'

const globalWindow = window as never as Window & IPrettierPlugins

const formatOptions = {
	parser: 'typescript',
	plugins: globalWindow.prettierPlugins,
	...prettierOptions as Options
}

/**
 * Форматирование TypeScript-кода.
 * @param source
 */
export default function formatCode(source: string) {
	return format(source, formatOptions)
}