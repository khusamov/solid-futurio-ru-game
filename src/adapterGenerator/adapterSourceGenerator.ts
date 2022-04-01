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
				constructor(universalObject, iocContainer) {
					this.universalObject = universalObject
					this.iocContainer = iocContainer
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
				return this.iocContainer.resolve('Getter', this.universalObject, '${propertyName}');
			}
			
			set ${propertyName}(value) {
				return this.iocContainer.resolve('Setter', this.universalObject, '${propertyName}', value).execute();
			}
		`
	)
	return result + '\n' + acessors
}