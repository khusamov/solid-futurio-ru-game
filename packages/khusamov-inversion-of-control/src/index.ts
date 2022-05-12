import {isReImport} from './functions';

export * from './interfaces'
export * from './errors'
export * from './types'
export * from './classes'
export * from './functions'

// Проверка на повторную загрузку пакета.
// Нельзя класс IoC определять более одного раза.
const packageName = 'khusamov-inversion-of-control'
if (isReImport(packageName)) {
	console.warn(`Внимание, пакет '${packageName}' загружен повторно!`)
}