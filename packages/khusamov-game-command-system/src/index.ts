export {IMovable, MoveCommand, MoveCorrectionCommand} from './command/MoveCommand'
export {ITransformForceOrder, TransformForceCommand, transformForceResolver} from './command/MoveCommand'

/**
 * На данный момент вызывать reflect() на типах из внешних пакетов нельзя.
 * Приходится выкручиваться тем, что заранее будут создаваться и экспортироваться ReflectedTypeRef-объекты.
 * TODO Дождаться решения заявки typescript-rtti/issues/58
 * @link https://github.com/typescript-rtti/typescript-rtti/issues/58
 */
export {default as IMovableReflectedTypeRef} from './command/MoveCommand/IMovableReflectedTypeRef'