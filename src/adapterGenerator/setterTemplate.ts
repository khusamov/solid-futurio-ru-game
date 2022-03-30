import iocResolveTemplate from './iocResolveTemplate';

// TODO Сделать поддержку readonly

export default function setterTemplate(propertyName: string, interfaceName: string) {
	const resultExpression = (
		iocResolveTemplate(
			`${interfaceName}.${propertyName}.setter`,
			'value'
		)
	)
	return `set ${propertyName}(value) { return ${resultExpression}.execute() }`
}