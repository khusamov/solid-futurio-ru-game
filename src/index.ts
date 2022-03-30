import 'reflect-metadata'
import {reflect} from 'typescript-rtti'
import IRegistrator from './types/IRegistrator';
import IoC from './inversionOfControl/IoC';
import adapterGenerator, {adapterSourceGenerator} from './adapterGenerator';
import UniversalObject from './object/UniversalObject';

interface IMovable {
	position: string
	readonly movementVelocity: string
}

const iocContainer = new IoC()

iocContainer.resolve<IRegistrator>('Registrator', 'Adapter', adapterGenerator).register()
iocContainer.resolve<IRegistrator>(
	'Registrator',
	'IMovable.position.getter',
	(universalObject: UniversalObject): number => {
		return universalObject.getValue('position')
	}
).register()

const uObject = new UniversalObject()
uObject.setValue('position', 100)
const movableAdapter = iocContainer.resolve<IMovable>('Adapter', uObject, reflect<IMovable>())

const bodyElement = document.querySelector('body')
if (bodyElement) {
	const preElement = bodyElement.appendChild(document.createElement('pre'))
	preElement.style.tabSize = String(3)
	preElement.innerText = adapterSourceGenerator(reflect<IMovable>())

	const pElement = bodyElement.appendChild(document.createElement('p'))
	pElement.innerText = `movableAdapter.position = ${movableAdapter.position}`
}
