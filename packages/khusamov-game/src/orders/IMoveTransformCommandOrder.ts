import {IRelayCommandOrder} from 'khusamov-command-order-system';
import {
	clockwiseRotateForceActionResolver,
	counterclockwiseRotateForceActionResolver,
	rotateForceActionResolver,
	decreaseForceActionResolver,
	increaseForceActionResolver,
	toroidalTransformActionResolver
} from 'khusamov-mechanical-motion';

export type TMoveTransformActionResolveParameters = (
	| ['MoveTransformAction.UnknownTransformAction']
	| ['MoveTransformAction.IncreaseForce', ...Parameters<typeof increaseForceActionResolver>]
	| ['MoveTransformAction.DecreaseForce', ...Parameters<typeof decreaseForceActionResolver>]
	| ['MoveTransformAction.RotateForce', ...Parameters<typeof rotateForceActionResolver>]
	| ['MoveTransformAction.ToroidalPositionTransformation', ...Parameters<typeof toroidalTransformActionResolver>]
	| ['MoveTransformAction.ClockwiseRotateForce', ...Parameters<typeof clockwiseRotateForceActionResolver>]
	| ['MoveTransformAction.CounterclockwiseRotateForce', ...Parameters<typeof counterclockwiseRotateForceActionResolver>]
)

/**
 * Приказ IMoveTransformCommandOrder.
 * Обязательно сделать регистрацию:
 * - register('MoveTransformCommand', relayCommandResolver)
 */
export default interface IMoveTransformCommandOrder
	extends IRelayCommandOrder<TMoveTransformActionResolveParameters, 'MoveTransformCommand'> {}