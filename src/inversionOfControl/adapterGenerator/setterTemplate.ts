import iocResolveTemplate from './iocResolveTemplate';

export default function setterTemplate(propertyName: string, interfaceName: string) {
	const resultExpression = (
		iocResolveTemplate(
			`${interfaceName}.${propertyName}.setter`,
			'this.universalObject'
		)
	)
	return `set ${propertyName}() { return ${resultExpression}.execute() }`
}