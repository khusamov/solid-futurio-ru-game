import 'reflect-metadata'
import {reflect} from 'typescript-rtti'
import {IoC} from './inversionOfControl';
import {AdapterGeneratorRegistrator, adapterSourceGenerator} from './adapterGenerator';
import UniversalObject from './object/UniversalObject';
import formatCode from './formatCode';

const iocContainer = new IoC()
new AdapterGeneratorRegistrator(iocContainer).register()

interface IMovable {
	position: number
	readonly movementVelocity: string
}

const universalObject = new UniversalObject()
const movableAdapter = iocContainer.resolve<IMovable>('Adapter', universalObject, reflect<IMovable>())
movableAdapter.position = 100

const adapterSource = adapterSourceGenerator(reflect<IMovable>())

const bodyElement = document.querySelector('body')
if (bodyElement) {
	const preElement = bodyElement.appendChild(document.createElement('pre'))
	preElement.style.tabSize = String(3)
	preElement.innerText = formatCode(adapterSource)

	const pElement = bodyElement.appendChild(document.createElement('p'))
	pElement.innerText = `movableAdapter.position = ${movableAdapter.position}`
}
