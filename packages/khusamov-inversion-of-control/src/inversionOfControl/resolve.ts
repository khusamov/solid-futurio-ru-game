import IoC from './IoC';

export default function resolve<T>(dependencyName: string, ...args: Array<any>): T {
	return IoC.resolve<T>(dependencyName, ...args)
}