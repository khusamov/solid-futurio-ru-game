import {getApplicationRollupConfig} from 'khusamov-rollup-config';
import npmPackageJsonFile from './package.json';

export default getApplicationRollupConfig({
	npmPackageJsonFile,
	tsconfig: './tsconfig.json'
});