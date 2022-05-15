import {ICommand} from '../interfaces';

/**
 * Пустая команда. Ничего не выполняет.
 * Используется для создания повторяющихся команд.
 */
export class NotOperationCommand implements ICommand {
	public constructor() {}
	public execute(): void {}
}