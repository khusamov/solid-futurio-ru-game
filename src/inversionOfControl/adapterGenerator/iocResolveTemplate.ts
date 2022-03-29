export default function iocResolveTemplate(dependencyName: string, ...argumentExpressionList: Array<string>) {
	const argumentSuffix = (
		argumentExpressionList.reduce(
			(result, argumentExpression) => `${result}, ${argumentExpression}`,
			''
		)
	)
	return (
		`IoC.resolve('${dependencyName}'${argumentSuffix})`
	)
}