import {JSONSchemaForNPMPackageJsonFiles} from '@schemastore/package';
import {OutputOptions, RollupOptions} from 'rollup';
// import {terser} from 'rollup-plugin-terser';
import plugins from './plugins';
import {cyan} from 'chalk'; // Новая версия chalk не работает, приходится использовать 4.0.0.

/**
 * Флаги с типами окружения.
 */
//const isRollupWatch = process.env.ROLLUP_WATCH === 'true';

interface IGetLibraryRollupConfigOptions {
	outDir: string;
	npmPackageJsonFile: JSONSchemaForNPMPackageJsonFiles;
}

/**
 * Генератор конфигурационного файла RollupJS для сборки библиотеки ReactJS компонент.
 */
export function getLibraryRollupConfig({outDir = 'dist', npmPackageJsonFile}: IGetLibraryRollupConfigOptions): RollupOptions {
	const {peerDependencies, description, name} = npmPackageJsonFile;

	console.log(`Сборка пакета '${description || name}'.`);

	/**
	 * Настройки выходных файлов.
	 */
	const output: OutputOptions = {
		dir: outDir,
		sourcemap: true,
		// Плагин terser временно пока отключен, мешает отладке, т.к. весь код зашифрован.
		// plugins: [...!isRollupWatch ? [terser()] : []]
	};

	/**
	 * Внешние библиотеки.
	 * @link https://rollupjs.org/guide/en/#external
	 * @link https://rollupjs.org/guide/en/#peer-dependencies
	 * @link https://rollupjs.org/guide/en/#warning-treating-module-as-external-dependency
	 */
	const external = Object.keys(peerDependencies || {});
	console.log('Внешние пакеты (на основе peerDependencies):', cyan(external.join(', ') + '.'));

	return {
		external: id => external.includes(id[0] === '@' ? id.split('/')[0] + '/' + id.split('/')[1] : id.split('/')[0]),
		// external,
		input: 'src/index.ts',
		plugins: plugins({target: 'es2019', npmPackageJsonFile, outDir}),
		output: {
			...output,
			sourcemap: true,
			format: 'es',
			entryFileNames: '[name].next.js'
		}
	};
}