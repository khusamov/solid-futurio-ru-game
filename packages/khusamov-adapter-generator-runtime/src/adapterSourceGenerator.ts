import {ReflectedTypeRef} from 'typescript-rtti';

/**
 * Генератор адаптера. Генерация производится на основе интерфейса.
 */
export default function adapterSourceGenerator(reflectedTypeRef: ReflectedTypeRef): string {
	const reflectedInterface = reflectedTypeRef.as('interface').reflectedInterface
	const {properties, class: {name: interfaceName}} = reflectedInterface
	const adapterClassName = interfaceName.substring(1) + 'Adapter' //  IMovable -> MovableAdapter
	return (
		`
			class ${adapterClassName} {
				constructor(universalObject) {
					if (!universalObject) {
						throw new Error("На входе конструктора '${adapterClassName}' ожидается определенный universalObject")
					}
					this.universalObject = universalObject
				}
				
				${properties.reduce((result, {name}) => acessorTempale(result, name), '')}
			}
		`
	)
}

function acessorTempale(result: string, propertyName: string) {
	const acessors = (
		`
			get ${propertyName}() {
				return this.universalObject.getValue('${propertyName}')
			}
			
			set ${propertyName}(value) {
				this.universalObject.setValue('${propertyName}', value)
			}
		`
	)
	return result + '\n' + acessors
}