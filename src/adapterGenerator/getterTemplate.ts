import iocResolveTemplate from './iocResolveTemplate';

export default function getterTemplate(propertyName: string) {
	const resultExpression = (
		iocResolveTemplate(
			'Getter',
			'this.universalObject',
			`'${propertyName}'`
		)
	)
	return `get ${propertyName}() { return ${resultExpression} }`
}