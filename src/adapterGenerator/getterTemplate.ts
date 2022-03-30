import iocResolveTemplate from './iocResolveTemplate';

export default function getterTemplate(propertyName: string, interfaceName: string) {
	const resultExpression = (
		iocResolveTemplate(
			`${interfaceName}.${propertyName}.getter`,
			'this.universalObject'
		)
	)
	return `get ${propertyName}() { return ${resultExpression} }`
}