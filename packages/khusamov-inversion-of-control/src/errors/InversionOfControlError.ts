export class InversionOfControlError extends Error {
	constructor(message?: string) {
		message = 'InversionOfControl: ' + message
		super(message);
	}
}