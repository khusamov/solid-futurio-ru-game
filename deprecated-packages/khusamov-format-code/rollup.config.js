import RollupConfigGenerator from '../RollupConfigGenerator'
import npmPackageJsonFile from './package.json';
const generator = new RollupConfigGenerator({npmPackageJsonFile})

export default generator.generate()