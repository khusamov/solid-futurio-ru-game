import {ICommand, Vector} from 'khusamov-base-types';
import IMovable from './IMovable';

/**
 * Поступательное движение.
 * Рассчитывается за определенный промежуток времени.
 */
export default class MoveCommand implements ICommand {
	public readonly name = 'MoveCommand'

	/**
	 * Конструктор команды поступательного движения.
	 * @param movable Движущийся объект.
	 * @param modVector Ограничительный вектор (размер мира), чтобы создать замкнутое пространство-бублик.
	 */
	constructor(
		private movable: IMovable,
		private modVector: Vector = new Vector(Infinity, Infinity)
	) {}

	public execute(): void {
		const {mass, position, linearAcceleration, linearVelocity, appliedForce} = this.movable
		this.movable.linearAcceleration = appliedForce.scale(1 / mass)
		this.movable.linearVelocity = linearVelocity.translate(linearAcceleration.scale(this.timeInterval))
		this.movable.position = position.translate(linearVelocity).mod(this.modVector)
	}

	private get timeInterval(): number {
		const currentTime = new Date().getTime()
		const timeInterval = (currentTime - this.movable.time) / 1000
		this.movable.time = currentTime
		return timeInterval
	}
}