import {JSONSchemaForNPMPackageJsonFiles} from '@schemastore/package';

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

interface IOptions {
	target: string;
	outDir: string;
	npmPackageJsonFile: JSONSchemaForNPMPackageJsonFiles;
}

/**
 * Флаги с типами окружения.
 */
const isRollupWatch = process.env.ROLLUP_WATCH === 'true';

export default function plugins({target, outDir, npmPackageJsonFile: {version}}: IOptions) {
	return [
		json(),
		resolve(),
		progress(),
		commonjs(),

		typescript({
			target: target,
			outDir
		}),

		// https://github.com/vladshcherbin/rollup-plugin-delete
		!isRollupWatch && deleteDist({
			targets: outDir
		}),

		replace({
			'process.env.NODE_ENV': JSON.stringify(isRollupWatch ? 'production' : 'development'),
			'process.env.BUILD_VERSION': JSON.stringify(version),
			'process.env.BUILD_DATE': JSON.stringify(+new Date)
		}),

		postcss({
			modules: true
		}),

		// https://github.com/rollup/rollup-plugin-url/issues/18
		smartAsset({
			url: 'copy',
			keepImport: true
		})
	];
}