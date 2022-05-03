import IoC from './IoC';

export default function resolve<T, P extends any[] = any[]>(dependencyName: string, ...params: P): T {
	return IoC.resolve<T, P>(dependencyName, ...params)
}