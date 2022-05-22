import {GamePlugin} from '../classes/GamePlugin';
import {register} from 'khusamov-inversion-of-control';
import {
	increaseForceCommandResolver,
	moveCommandResolver,
	rotateCommandResolver,
	rotateForceCommandResolver,
	toroidalTransformCommandResolver
} from 'khusamov-mechanical-motion';

export class MechanicalMotionSystemPlugin extends GamePlugin {
	public init(): void {
		register('MoveCommand', moveCommandResolver)
		register('RotateCommand', rotateCommandResolver)
		register('IncreaseForceCommand', increaseForceCommandResolver)
		register('RotateForceCommand', rotateForceCommandResolver)
		register('ToroidalTransformCommand', toroidalTransformCommandResolver)
	}
}