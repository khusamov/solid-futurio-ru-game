
// https://github.com/rollup/plugins
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import replace from '@rollup/plugin-replace';
import json from '@rollup/plugin-json';
import smartAsset from 'rollup-plugin-smart-asset';
import postcss from 'rollup-plugin-postcss';
import deleteDist from 'rollup-plugin-delete';
import {terser} from 'rollup-plugin-terser';

import ttypescript from 'ttypescript';
import {cyan} from 'chalk';


export default class RollupConfigGenerator {
	npmPackageJsonFile
	isRollupWatch
	terserPluginEnabled
	outDir
	external
	outputPlugins

	/**
	 * getConfig
	 * @param options
	 * @param options.npmPackageJsonFile
	 */
	constructor(options) {
		const {npmPackageJsonFile} = options
		this.npmPackageJsonFile = npmPackageJsonFile

		// Находится ли сборщик Rollup в режиме отслеживания файлов или нет.
		this.isRollupWatch = process.env.ROLLUP_WATCH === 'true';

		this.terserPluginEnabled = false
		this.outDir = 'dist'
		const {description, name, dependencies} = this.npmPackageJsonFile;

		console.log(`Сборка пакета '${description || name}'.`);

		/**
		 * Внешние библиотеки.
		 * @link https://rollupjs.org/guide/en/#external
		 * @link https://rollupjs.org/guide/en/#peer-dependencies
		 * @link https://rollupjs.org/guide/en/#warning-treating-module-as-external-dependency
		 */
		this.external = Object.keys(dependencies || {});
		if (this.external.length > 0) {
			console.log(
				'Внешние пакеты (на основе dependencies):',
				cyan(this.external.join(', ') + '.')
			);
		}

		this.outputPlugins = [
			...!this.isRollupWatch && this.terserPluginEnabled ? [terser()] : []
		]
	}

	generate() {
		const {main, module, version} = this.npmPackageJsonFile;
		return {
			input: 'src/index.ts',
			plugins: [
				json(),
				commonjs(),

				resolve({
					// Используется events из https://www.npmjs.com/package/events
					// Поэтому требуется установить опцию preferBuiltins в значение false, чтобы не спутать со встроенным модулем events.
					// https://github.com/rollup/plugins/tree/master/packages/node-resolve#preferbuiltins
					// Если false, плагин будет искать локально установленные одноименные модули.
					preferBuiltins: false
				}),

				typescript({
					outDir: this.outDir,
					typescript: ttypescript,
					tsconfig: './tsconfig.json'
				}),

				postcss({
					modules: true
				}),

				// https://github.com/vladshcherbin/rollup-plugin-delete
				!this.isRollupWatch && deleteDist({
					targets: this.outDir
				}),

				replace({
					preventAssignment: true,
					'process.env.NODE_ENV': JSON.stringify(this.isRollupWatch ? 'production' : 'development'),
					'process.env.BUILD_VERSION': JSON.stringify(version),
					'process.env.BUILD_DATE': JSON.stringify(+new Date)
				}),

				// https://github.com/rollup/rollup-plugin-url/issues/18
				smartAsset({
					url: 'copy',
					keepImport: true
				})
			],
			external: (
				id => this.external.includes(
					id[0] === '@'
						? id.split('/')[0] + '/' + id.split('/')[1]
						: id.split('/')[0]
				)
			),
			output: [
				{
					file: module,
					format: 'es',
					sourcemap: true,
					plugins: this.outputPlugins
				},
				{
					file: main,
					format: 'cjs',
					exports: 'auto',
					sourcemap: true,
					plugins: this.outputPlugins
				}
			]
		}
	}
}