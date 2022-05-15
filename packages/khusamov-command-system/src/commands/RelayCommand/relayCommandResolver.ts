import {TAction} from 'khusamov-base-types';
import {resolve} from 'khusamov-inversion-of-control';
import {ICommand} from '../../interfaces';
import {IRelayCommandOrder} from './IRelayCommandOrder';
import {RelayCommand} from './RelayCommand';

export function relayCommandResolver(relayCommandOrder: IRelayCommandOrder): ICommand {
	const name = relayCommandOrder.name
	const action = resolve<TAction>(...relayCommandOrder.action)
	return (
		name
			? new RelayCommand(name, action)
			: new RelayCommand(action)
	)
}