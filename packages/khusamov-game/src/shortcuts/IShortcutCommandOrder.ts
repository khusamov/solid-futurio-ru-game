import {ICommandOrder, IStartCommandOrder, IStopCommandOrder, TOrderQueue} from 'khusamov-command-order-system';
import {IDisposable, Shortcut} from 'khusamov-base-types';
import {resolve} from 'khusamov-inversion-of-control';
import {createUniversalObject} from 'khusamov-universal-object';

// Подсистема создания шорткатов на команды.
// Идея: за каждой клавишей закрепляется приказ, на основе которого создаются
// два приказа IStartCommandOrder и IStopCommandOrder, которые в свою очередь
// закрепляются на нажатие и отжатие клавиши соответственно.

export default interface IShortcutCommandOrder<Order extends ICommandOrder = ICommandOrder> {
	/**
	 * Код клавиши.
	 */
	key: string

	/**
	 * Данные для создания команды, которая закрепляется за клавишей.
	 */
	command: {
		/**
		 * Имя команды для IStartCommandOrder и IStopCommandOrder.
		 * Должно быть уникальным в пределах targetObject.
		 */
		name: string,

		/**
		 * Вычисление зависимости, возвращающее объект для IStartCommandOrder и IStopCommandOrder.
		 */
		targetObject: [string]

		/**
		 * Приказ команды, которая закрепляется за клавишей.
		 */
		order: Order
	}
}

export function registerShortcutCommand(shortcutCommand: IShortcutCommandOrder): IDisposable {
	return (
		Shortcut.register(shortcutCommand.key, {
			down() {
				resolve<TOrderQueue>('OrderQueue').enqueue(
					createUniversalObject<IStartCommandOrder>({
						type: 'StartCommand',
						commandName: shortcutCommand.command.name,
						targetObject: shortcutCommand.command.targetObject,
						command: shortcutCommand.command.order
					})
				)
			},
			up() {
				resolve<TOrderQueue>('OrderQueue').enqueue(
					createUniversalObject<IStopCommandOrder>({
						type: 'StopCommand',
						commandName: shortcutCommand.command.name,
						targetObject: shortcutCommand.command.targetObject
					})
				)
			}
		})
	)
}

