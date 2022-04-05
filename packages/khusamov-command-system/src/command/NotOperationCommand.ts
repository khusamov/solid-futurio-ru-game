import {ICommand} from 'khusamov-base-types';

/**
 * Пустая команда. Ничего не выполняет.
 * Используется для создания повторяющихся команд.
 */
export default class NotOperationCommand implements ICommand {
	constructor() {}
	public execute(): void {}
}