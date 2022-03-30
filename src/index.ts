import "reflect-metadata" // Обязательный для использования typescript-rtti импорт!
import {reflect} from 'typescript-rtti'

import IMovable from './IMovable';
import adapterGenerator from './inversionOfControl/adapterGenerator';
import IoC from './inversionOfControl/IoC';
import UniversalObject from './object/UniversalObject';
import IRegistrator from './types/IRegistrator';
import adapterSourceGenerator from './inversionOfControl/adapterGenerator/adapterSourceGenerator';

const iocContainer = new IoC()

iocContainer.resolve<IRegistrator>('Registrator', 'Adapter', adapterGenerator).register()
iocContainer.resolve<IRegistrator>('Registrator', 'IMovable.position.getter', (universalObject: UniversalObject): number => {
	return universalObject.getValue('position')
}).register()

const uObject = new UniversalObject()
uObject.setValue('position', 100)
const movableAdapter = iocContainer.resolve<IMovable>('Adapter', reflect<IMovable>(), uObject, iocContainer)
console.log('movableAdapter.position',movableAdapter.position)

const bodyElement = document.querySelector('body')
if (bodyElement) {
	const preElement = bodyElement.appendChild(document.createElement('pre'))
	preElement.style.tabSize = String(3)
	preElement.innerText = adapterSourceGenerator(reflect<IMovable>())
}
