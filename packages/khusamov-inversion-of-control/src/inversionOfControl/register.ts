import IoC from './IoC';
import {IRegistrator} from 'khusamov-base-types';

export default function register(...args: Array<any>) {
	return IoC.resolve<IRegistrator>('Registrator', ...args).register()
}