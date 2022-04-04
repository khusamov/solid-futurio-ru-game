export default interface IUniversalObject {
	getValue<T>(name: string): T
	setValue<T>(name: string, value: T): void
}