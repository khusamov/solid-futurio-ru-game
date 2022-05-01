import {IOrder, StopCommand} from 'khusamov-command-system';
import {ICommand} from 'khusamov-base-types';
import {resolve} from 'khusamov-inversion-of-control';
import {IMovable} from 'khusamov-mechanical-motion';
import {UniversalObjectAdapter} from 'khusamov-universal-object';

export default interface IStopOrder extends IOrder {
	type: 'Stop'
	command: string
	target: {
		type: string
		name: string
	}
}

export function stopCommandResolver(order: IStopOrder): ICommand {
	const target = resolve<IMovable | undefined>(order.target.type, order.target)
	if (!target) {
		throw new Error(`Целевой объект не найден '${JSON.stringify(order.target)}'`)
	}
	return new StopCommand(
		order.command,
		// TODO Избавиться от использования класса UniversalObjectAdapter
		new UniversalObjectAdapter(target)
	)
}