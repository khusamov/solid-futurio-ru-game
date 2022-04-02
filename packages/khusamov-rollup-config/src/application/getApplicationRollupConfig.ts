import {OutputPlugin} from 'rollup';
import ttypescript from "ttypescript";
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import json from '@rollup/plugin-json';
import html from '@rollup/plugin-html';
import livereload from 'rollup-plugin-livereload';
import serve from 'rollup-plugin-serve';
import {terser} from 'rollup-plugin-terser';
import {isRollupWatch} from '../isRollupWatch';
import htmlTemplate from './htmlTemplate';
import IGetApplicationRollupConfigOptions from './IGetApplicationRollupConfigOptions';

export default function getApplicationRollupConfig(options: IGetApplicationRollupConfigOptions) {
	const {title, tsconfig, outDir = 'dist', terserPluginEnabled = false, npmPackageJsonFile} = options
	const {description, name, main, module} = npmPackageJsonFile;

	console.log(`Сборка приложения '${description || name}'.`);

	const outputPlugins: (OutputPlugin | null | false | undefined)[] = [
		...!isRollupWatch && terserPluginEnabled ? [terser()] : []
	]

	return {
		input: {
			index: 'src/index.ts',
		},
		output: [
			{
				entryFileNames: '[name].js',
				dir: outDir,
				// file: module,
				format: 'es',
				sourcemap: true,
				plugins: outputPlugins
			},
			// {
			// 	file: main,
			// 	format: 'cjs',
			// 	exports: 'auto',
			// 	sourcemap: true,
			// 	plugins: outputPlugins
			// }
		],
		plugins: [
			json(),
			resolve(),
			commonjs(),
			livereload(outDir),
			typescript({
				outDir,
				tsconfig,
				typescript: ttypescript
			}),
			html({
				template: htmlTemplate,
				title: title || description || name
			}),
			serve({
				//open: true,
				contentBase: outDir
			})
		]
	}
}