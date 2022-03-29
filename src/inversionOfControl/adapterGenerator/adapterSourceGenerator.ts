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
	return (
		formatCode(
			`
				// implements ${interfaceName}
				class {
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
		constructor(universalObject) {
			this.universalObject = universalObject
		}
	`
}