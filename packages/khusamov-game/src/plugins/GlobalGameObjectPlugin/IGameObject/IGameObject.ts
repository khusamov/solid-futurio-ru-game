export default interface IGameObject {
	/**
	 * Идентификатор игрового объекта.
	 */
	name: string

	/**
	 * Перечень интерфейсов, которые реализовывает данный игровой объект.
	 */
	kind: string[]
}