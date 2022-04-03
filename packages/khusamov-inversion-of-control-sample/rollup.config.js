import html from '@rollup/plugin-html';
import serve from 'rollup-plugin-serve';
import RollupConfigGenerator from '../RollupConfigGenerator'
import htmlTemplate from '../htmlTemplate'
import npmPackageJsonFile from './package.json';

const {description, name} = npmPackageJsonFile
const generator = new RollupConfigGenerator({npmPackageJsonFile})

const config = generator.generate()

config.plugins.push(
	generator.isRollupWatch && html({
		title: description || name,
		template: htmlTemplate
	}),
	generator.isRollupWatch && serve({
		open: true,
		contentBase: generator.outDir
	})
)

config.output = config.output.filter(item => item.format = 'es')

export default config








