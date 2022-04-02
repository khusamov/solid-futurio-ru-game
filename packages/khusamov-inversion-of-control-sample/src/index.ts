import 'reflect-metadata'
import {reflect} from 'typescript-rtti'
import {IoC, IRegistrator, UniversalObject} from 'khusamov-inversion-of-control';
import {adapterGeneratorResolver, adapterSourceGenerator} from 'khusamov-inversion-of-control';
import formatCode from './formatCode';

const {querySelector, createElement} = document

const iocContainer = new IoC()
iocContainer.resolve<IRegistrator>('Registrator', 'Adapter', adapterGeneratorResolver).register()

interface IMovable {
	position: number
	readonly movementVelocity: string
}

const universalObject = new UniversalObject()
const movableAdapter = iocContainer.resolve<IMovable>('Adapter', universalObject, reflect<IMovable>())
movableAdapter.position = 100

const adapterSource = adapterSourceGenerator(reflect<IMovable>())

const bodyElement = querySelector('body')
if (bodyElement) {
	const preElement = bodyElement.appendChild(createElement('pre'))
	preElement.style.tabSize = String(3)
	preElement.innerText = formatCode(adapterSource)

	const pElement = bodyElement.appendChild(createElement('p'))
	pElement.innerText = `movableAdapter.position = ${movableAdapter.position}`
}
