import {ICommand, Shortcut} from 'khusamov-base-types';
import {resolve, TResolveParameters} from 'khusamov-inversion-of-control';
import {ICommandOrder, IStartCommandOrder, IStopCommandOrder, TOrderQueue} from 'khusamov-command-order-system';
import {createUniversalObject} from 'khusamov-universal-object';

// TODO Подумать над этим классом - стоит ли оно того или нет?

export default class RegisterShortcutCommand implements ICommand {
	public readonly name = 'RegisterShortcutCommand'

	public constructor(
		private key: string,
		private command: {
			name: string
			order: ICommandOrder
			targetObject: TResolveParameters
		}
	) {}

	public execute(): void {
		Shortcut.register(this.key, {
			down: () => {
				resolve<TOrderQueue>('OrderQueue').enqueue(
					createUniversalObject<IStartCommandOrder>({
						type: 'StartCommand',
						commandName: this.command.name,
						targetObject: this.command.targetObject,
						command: this.command.order
					})
				)
			},
			up: () => {
				resolve<TOrderQueue>('OrderQueue').enqueue(
					createUniversalObject<IStopCommandOrder>({
						type: 'StopCommand',
						commandName: this.command.name,
						targetObject: this.command.targetObject
					})
				)
			}
		})
	}
}