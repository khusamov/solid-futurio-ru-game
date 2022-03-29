import "reflect-metadata" // Обязательный для использования typescript-rtti импорт!
import {reflect} from 'typescript-rtti'

import IMovable from './IMovable';
import {adapterSourceGenerator} from './inversionOfControl/adapterGenerator';
import IoC from './inversionOfControl/IoC';

IoC.register('Adapter.Source', adapterSourceGenerator)

const bodyElement = document.querySelector('body')
if (bodyElement) {
	const preElement = bodyElement.appendChild(document.createElement('pre'))
	preElement.style.tabSize = String(3)
	preElement.innerText = IoC.resolve<string>('Adapter.Source', reflect<IMovable>())
}
