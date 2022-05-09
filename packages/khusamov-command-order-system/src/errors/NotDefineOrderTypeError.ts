export default class NotDefineOrderTypeError extends Error {
	constructor() {
		super('Не определен тип приказа')
	}
}