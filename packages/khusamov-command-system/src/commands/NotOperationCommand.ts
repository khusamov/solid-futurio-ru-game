import {ICommand} from '../interfaces';

/**
 * Пустая команда. Ничего не выполняет.
 * Используется для создания повторяющихся команд.
 */
export class NotOperationCommand implements ICommand {
	public readonly name = 'NotOperationCommand'
	public constructor() {}
	public execute(): void {}
}