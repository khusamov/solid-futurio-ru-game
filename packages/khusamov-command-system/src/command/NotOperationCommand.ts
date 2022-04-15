import {ICommand} from 'khusamov-base-types';

/**
 * Пустая команда. Ничего не выполняет.
 * Используется для создания повторяющихся команд.
 */
export default class NotOperationCommand implements ICommand {
	public readonly name = 'NotOperationCommand'
	public constructor() {}
	public execute(): void {}
}