import {ICommandOrder, IStartCommandOrder, IStopCommandOrder, TOrderQueue} from 'khusamov-command-order-system';
import {IDisposable, Shortcut} from 'khusamov-base-types';
import {resolve} from 'khusamov-inversion-of-control';
import {createUniversalObject} from 'khusamov-universal-object';
import {TGameObjectResolver} from '../game/gameObjectResolver';
import getSelectedGameObjectName from '../game/getSelectedGameObjectName';

// Подсистема создания шорткатов на команды.
// Идея: за каждой клавишей закрепляется две команды Start/Stop с любой пользовательской командой.

export default interface IShortcutCommand<Order extends ICommandOrder = ICommandOrder> {
	key: string
	command: {
		name: string
		order: Order
	}
}

export function registerShortcutCommand(shortcutCommand: IShortcutCommand): IDisposable {
	return (
		Shortcut.register(shortcutCommand.key, {
			down() {
				resolve<TOrderQueue>('OrderQueue').enqueue(
					createUniversalObject<IStartCommandOrder<TGameObjectResolver>>({
						type: 'StartCommand',
						commandName: shortcutCommand.command.name,
						targetObject: ['GameObject', getSelectedGameObjectName()],
						command: shortcutCommand.command.order
					})
				)
			},
			up() {
				resolve<TOrderQueue>('OrderQueue').enqueue(
					createUniversalObject<IStopCommandOrder<TGameObjectResolver>>({
						type: 'StopCommand',
						commandName: shortcutCommand.command.name,
						targetObject: ['GameObject', getSelectedGameObjectName()]
					})
				)
			}
		})
	)
}

