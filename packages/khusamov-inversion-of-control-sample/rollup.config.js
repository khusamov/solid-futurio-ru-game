import html from '@rollup/plugin-html';
import serve from 'rollup-plugin-serve';
import RollupConfigGenerator from '../RollupConfigGenerator'
import htmlTemplate from '../htmlTemplate'
import npmPackageJsonFile from './package.json';

const {description, name, main} = npmPackageJsonFile
const generator = new RollupConfigGenerator({npmPackageJsonFile})

const config = generator.generate()

config.input = 'src/index.tsx'

config.output = [{
	file: main,
	// Для приложений оказывается надо выбирать формат UMD. Иначе странные проблемы с подключением зависимостей.
	format: 'umd',
	sourcemap: true,
	plugins: generator.outputPlugins,
	// globals: {
	// 	'react-dom': 'ReactDOM',
	// 	react: 'React'
	// }
}]

config.plugins.push(
	generator.isRollupWatch && html({
		title: description || name,
		template: htmlTemplate
	}),
	generator.isRollupWatch && serve({
		open: true,
		verbose: true,
		contentBase: generator.outDir
	})
)

export default config








