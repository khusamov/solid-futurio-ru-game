import {ICommand} from 'khusamov-command-system';
import {IMovable, IRigidBody, IRotable, ITransformable} from 'khusamov-mechanical-motion';
import {Vector} from 'khusamov-base-types';
import {ICobraSpaceship} from '../ICobraSpaceship';

export enum CobraEngine {
	Left = 'Left',
	Right = 'Right'
}

/**
 * В этой команде меняются длины векторов реактивных сил двигателей, потому что длинами управляет игрок.
 * Угол регулируется в команде UpdateCobraSpaceshipCommand, потому что вектора должны быть всегда
 * паралельными осевой линии корабля, а это управляется автоматически.
 */
export class ControlCobraSpaceshipCommand implements ICommand {
	public constructor(
		private cobra: ICobraSpaceship & IMovable & IRotable & IRigidBody & ITransformable,
		private engine: CobraEngine,
		private increment: number
	) {}

	public execute(): void {
		const {appliedRightForce, appliedLeftForce} = this.cobra

		const appliedForce = (
			{
				[CobraEngine.Left]: appliedLeftForce,
				[CobraEngine.Right]: appliedRightForce
			}[this.engine]
		)

		const newAppliedForce = (
			appliedForce.length + this.increment < 0
				? new Vector(0, 0)
				: (
					appliedForce.isNull
						? appliedForce.identity.scale(this.increment)
						: appliedForce.translate(appliedForce.identity.scale(this.increment))
				)
		)

		switch (this.engine) {
			case CobraEngine.Left:
				this.cobra.appliedLeftForce = newAppliedForce
				break
			case CobraEngine.Right:
				this.cobra.appliedRightForce = newAppliedForce
				break
		}
	}
}