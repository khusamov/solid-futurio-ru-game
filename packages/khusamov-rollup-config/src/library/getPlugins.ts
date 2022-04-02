import {JSONSchemaForNPMPackageJsonFiles} from '@schemastore/package';

import {Plugin} from 'rollup';

// https://github.com/rollup/plugins
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import replace from '@rollup/plugin-replace';
import json from '@rollup/plugin-json';
import smartAsset from 'rollup-plugin-smart-asset';
import postcss from 'rollup-plugin-postcss';
import deleteDist from 'rollup-plugin-delete';
import progress from 'rollup-plugin-progress';

import {isRollupWatch} from '../isRollupWatch';

interface IOptions {
	npmPackageJsonFile: JSONSchemaForNPMPackageJsonFiles;

	/**
	 * Внимание, если не прописать путь к tsconfig.json, то декларации index.d.ts не будут генерироваться!
	 * @link https://github.com/rollup/plugins/issues/1112
	 * @link https://github.com/rollup/plugins/tree/master/packages/typescript#tsconfig
	 */
	tsconfig?: string | false;

	/**
	 * Используется для плагина rollup-plugin-delete.
	 */
	outDir: string;
}

type TGetPluginsResult = (Plugin | null | false | undefined)[]

export default function getPlugins({tsconfig = false, outDir, npmPackageJsonFile: {version}}: IOptions): TGetPluginsResult {
	return [
		json(),
		resolve(),
		progress(),
		commonjs(),

		postcss({
			modules: true
		}),

		typescript({tsconfig}),

		// https://github.com/vladshcherbin/rollup-plugin-delete
		!isRollupWatch && deleteDist({
			targets: outDir
		}),

		replace({
			preventAssignment: true,
			'process.env.NODE_ENV': JSON.stringify(isRollupWatch ? 'production' : 'development'),
			'process.env.BUILD_VERSION': JSON.stringify(version),
			'process.env.BUILD_DATE': JSON.stringify(+new Date)
		}),

		// https://github.com/rollup/rollup-plugin-url/issues/18
		smartAsset({
			url: 'copy',
			keepImport: true
		})
	];
}