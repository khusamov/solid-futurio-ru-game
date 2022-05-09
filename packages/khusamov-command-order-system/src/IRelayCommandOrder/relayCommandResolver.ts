import {ICommand} from 'khusamov-base-types';
import {resolve} from 'khusamov-inversion-of-control';
import {IUniversalObject} from 'khusamov-universal-object';
import {RelayCommand, TRelayCommandAction} from 'khusamov-command-system';
import RelayCommandOrderAdapter from './RelayCommandOrderAdapter';

export default function relayCommandResolver(relayCommandOrderObject: IUniversalObject): ICommand {
	const relayCommandOrder = new RelayCommandOrderAdapter(relayCommandOrderObject)
	return (
		new RelayCommand(
			relayCommandOrder.name,
			resolve<TRelayCommandAction>(...relayCommandOrder.action)
		)
	)
}