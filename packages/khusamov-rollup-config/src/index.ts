import {OutputPlugin, RollupOptions} from 'rollup';
import {terser} from 'rollup-plugin-terser';
import {cyan} from 'chalk';
import IGetLibraryRollupConfigOptions from './IGetLibraryRollupConfigOptions';
import {isRollupWatch} from './isRollupWatch';
import getPlugins from './getPlugins';

export {IGetLibraryRollupConfigOptions}

/**
 * Генератор конфигурационного файла RollupJS для сборки библиотеки ReactJS компонент.
 */
export function getLibraryRollupConfig(options: IGetLibraryRollupConfigOptions): RollupOptions {
	const {tsconfig = false, outDir = 'dist', terserPluginEnabled = false, npmPackageJsonFile} = options;
	const {peerDependencies, description, name, main, module} = npmPackageJsonFile;

	console.log(`Сборка пакета '${description || name}'.`);

	/**
	 * Внешние библиотеки.
	 * @link https://rollupjs.org/guide/en/#external
	 * @link https://rollupjs.org/guide/en/#peer-dependencies
	 * @link https://rollupjs.org/guide/en/#warning-treating-module-as-external-dependency
	 */
	const external = Object.keys(peerDependencies || {});
	if (external.length > 0) {
		console.log(
			'Внешние пакеты (на основе peerDependencies):',
			cyan(external.join(', ') + '.')
		);
	}

	const outputPlugins: (OutputPlugin | null | false | undefined)[] = [
		...!isRollupWatch && terserPluginEnabled ? [terser()] : []
	]

	return {
		input: 'src/index.ts',
		plugins: getPlugins({tsconfig, npmPackageJsonFile, outDir}),
		// output: {
		// 	dir: outDir,
		// 	format: 'es',
		// 	sourcemap: true,
		// 	entryFileNames: '[name].next.js',
		// 	plugins: [...!isRollupWatch && terserPluginEnabled ? [terser()] : []],
		// },

		output: [
			{
				file: module,
				format: 'es',
				sourcemap: true,
				plugins: outputPlugins
			},
			{
				file: main,
				format: 'cjs',
				exports: 'auto',
				sourcemap: true,
				plugins: outputPlugins
			}
		],



		external: (
			id => external.includes(
				id[0] === '@'
					? id.split('/')[0] + '/' + id.split('/')[1]
					: id.split('/')[0]
			)
		)
	};
}
