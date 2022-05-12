import IGetRollupConfigOptions from '../IGetRollupConfigOptions';

/**
 * Входные параметры генератора конфигурационных файлов для RollupJS.
 */
export default interface IGetApplicationRollupConfigOptions extends IGetRollupConfigOptions {
	title?: string
}
