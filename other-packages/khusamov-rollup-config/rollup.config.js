import json from '@rollup/plugin-json';
import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';

import {dependencies, module, main} from './package.json';

if (!dependencies) throw new Error('Файл package.json не содержит раздел dependencies')
if (!module) throw new Error('Файл package.json не содержит раздел module')
if (!main) throw new Error('Файл package.json не содержит раздел main')

export default {
	external: Object.keys(dependencies).concat(['fs', 'path']),
	input: 'src/index.ts',
	plugins: [
		json(),
		resolve(),
		commonjs(),
		typescript({
			// Внимание, если не прописать путь к tsconfig.json, то декларации index.d.ts не будут генерироваться!
			// https://github.com/rollup/plugins/issues/1112
			tsconfig: './tsconfig.json'
		})
	],
	output: [
		{
			file: module,
			format: 'es',
			sourcemap: true
		},
		{
			file: main,
			format: 'cjs',
			exports: 'auto',
			sourcemap: true
		}
	]
};