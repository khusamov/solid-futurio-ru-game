import {JSONSchemaForNPMPackageJsonFiles} from '@schemastore/package';

/**
 * Входные параметры генератора конфигурационных файлов для RollupJS.
 */
export default interface IGetLibraryRollupConfigOptions {
	/**
	 * Внимание, если не прописать путь к tsconfig.json, то декларации index.d.ts не будут генерироваться!
	 * @link https://github.com/rollup/plugins/issues/1112
	 * @link https://github.com/rollup/plugins/tree/master/packages/typescript#tsconfig
	 */
	tsconfig?: string | false;

	/**
	 * Путь к директории, где будет сохраняться сборка.
	 * @default dist
	 */
	outDir?: string;

	/**
	 * Файл package.json собираемого пакета.
	 */
	npmPackageJsonFile: JSONSchemaForNPMPackageJsonFiles;

	/**
	 * Разрешить использование плагина rollup-plugin-terser.
	 * Плагин rollup-plugin-terser временно пока отключен (значение по умолчанию задано false),
	 * потому что мешает отладке (весь код зашифрован).
	 * @default false
	 */
	terserPluginEnabled?: boolean
}
