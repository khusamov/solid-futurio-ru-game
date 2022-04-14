export type TAction = () => void

/**
 * @link http://khusamov.github.io/tutorial/csharp/key-down-up-process
 */
export default class KeyUpDownProcessor {
	/**
	 * Данный словарь хранит информацию о том, была ли нажата клавиша.
	 * В качестве ключа выступает номер клавиши,
	 * а значение это флаг (была или не была нажата клавиша).
	 * @private
	 * @link https://learn.javascript.ru/keyboard-events
	 */
	#theKeyWasDown: Map<string, boolean> = new Map

	public onKeyDown(event: KeyboardEvent, action: TAction) {
		// Из события извлекаем номер нажатой клавиши.
		const keyCode = event.code

		if (!this.#theKeyWasDown.has(keyCode)) {
			// Если такой клавиши нет в словаре,
			// то добавляем ее с информацией, что ранее она еще не была нажата.
			this.#theKeyWasDown.set(keyCode, false)
		}

		// Если клавиша ранее не была нажата, то:
		if (!this.#theKeyWasDown.get(keyCode)) {
			// Помечаем что она нажата.
			this.#theKeyWasDown.set(keyCode, true)
			// И выполняем действие при нажатии на эту клавишу.
			action()
		}
	}

	public onKeyUp(event: KeyboardEvent, action: TAction) {
		// Из события извлекаем номер нажатой клавиши.
		const keyCode = event.code
		// Помечаем что она уже не нажата.
		this.#theKeyWasDown.set(keyCode, false)
		// Выполняем действие при отжатии клавиши.
		action()
	}
}