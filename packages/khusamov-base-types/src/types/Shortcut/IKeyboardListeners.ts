export type TKeyboardListener = (event: KeyboardEvent) => void

export default interface IKeyboardListeners {
	down: TKeyboardListener
	up: TKeyboardListener
}