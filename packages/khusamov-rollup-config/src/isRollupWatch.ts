/**
 * Находится ли сборщик Rollup в режиме отслеживания файлов или нет.
 */
export const isRollupWatch: boolean = process.env.ROLLUP_WATCH === 'true';
