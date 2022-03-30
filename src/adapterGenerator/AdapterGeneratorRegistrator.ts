import IRegistrator from '../types/IRegistrator';
import IoC from '../inversionOfControl/IoC';
import adapterGeneratorResolver from './adapterGeneratorResolver';
import getterResolver from './getterResolver';
import setterResolver from './setterResolver';

/**
 * Регистрация всех зависимостей пакета adapterGenerator.
 */
export default class AdapterGeneratorRegistrator implements IRegistrator {
	constructor(private iocContainer: IoC) {}

	register(): void {
		this.iocContainer.resolve<IRegistrator>('Registrator', 'Adapter', adapterGeneratorResolver).register()
		this.iocContainer.resolve<IRegistrator>('Registrator', 'Getter', getterResolver).register()
		this.iocContainer.resolve<IRegistrator>('Registrator', 'Setter', setterResolver).register()
	}
}