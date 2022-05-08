import {register} from 'khusamov-inversion-of-control';
import increaseForceActionResolver from './increaseForceActionResolver';
import toroidalTransformActionResolver from './toroidalTransformActionResolver';
import decreaseForceActionResolver from './decreaseForceActionResolver';
import rotateForceActionResolver from './rotateForceActionResolver';
import clockwiseRotateForceActionResolver from './clockwiseRotateForceActionResolver';
import counterclockwiseRotateForceActionResolver from './counterclockwiseRotateForceActionResolver';

register('MoveTransformAction.IncreaseForce', increaseForceActionResolver)
register('MoveTransformAction.DecreaseForce', decreaseForceActionResolver)
register('MoveTransformAction.RotateForce', rotateForceActionResolver)
register('MoveTransformAction.ToroidalPositionTransformation', toroidalTransformActionResolver)

register('MoveTransformAction.ClockwiseRotateForce', clockwiseRotateForceActionResolver)
register('MoveTransformAction.CounterclockwiseRotateForce', counterclockwiseRotateForceActionResolver)