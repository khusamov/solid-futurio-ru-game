import iocResolveTemplate from './iocResolveTemplate';

// TODO Сделать поддержку readonly

export default function setterTemplate(propertyName: string) {
	const resultExpression = (
		iocResolveTemplate(
			'Setter',
			'this.universalObject',
			`'${propertyName}'`,
			'value'
		)
	)
	return `set ${propertyName}(value) { return ${resultExpression}.execute() }`
}