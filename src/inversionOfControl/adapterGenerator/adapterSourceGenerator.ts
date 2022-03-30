import formatCode from '../../formatCode';
import getterTemplate from './getterTemplate';
import setterTemplate from './setterTemplate';
import {ReflectedTypeRef} from 'typescript-rtti';

/**
 * Генератор адаптера. Генерация производится на основе интерфейса.
 */
export default function adapterSourceGenerator(reflectedTypeRef: ReflectedTypeRef) {
	const reflectedInterface = reflectedTypeRef.as('interface').reflectedInterface
	const {properties, class: {name: interfaceName}} = reflectedInterface
	const adapterClassName = interfaceName.substring(1) + 'Adapter'
	return (
		formatCode(
			`
				class ${adapterClassName} {
					${constructorTemplate()}
					${properties.map(property => getterTemplate(property.name, interfaceName)).join('')}
					${properties.map(property => setterTemplate(property.name, interfaceName)).join('')}
				}
			`
		)
	)
}

function constructorTemplate() {
	return `
		constructor(universalObject, iocContainer) {
			this.universalObject = universalObject
			this.iocContainer = iocContainer
		}
	`
}