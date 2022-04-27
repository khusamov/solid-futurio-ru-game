import init from './init';
import {ICommand, IQueue, ISize, IUniversalObject, KeyUpDownProcessor, Timer, Vector} from 'khusamov-base-types';
import {InterpretOrderCommand, RepeatableCommand, StartCommand} from 'khusamov-command-system';
import createSpaceshipObject from './createSpaceshipObject';
import createKeyboardHandlers from './createKeyboardHandlers';
import {IMovable, IMovableReflectedTypeRef, MoveCommand, MoveCorrectionCommand} from 'khusamov-game-command-system';
import {resolve} from 'khusamov-inversion-of-control';
import IGameOptions from './IGameOptions';
import positionCorrectionForToroid from './positionCorrectionForToroid';

export default class Game {
	public gameTimer: Timer
	public gameObjectList: IUniversalObject[]
	public commandQueue: IQueue<ICommand>
	public orderQueue: IQueue<IUniversalObject>
	public keyUpDownProcessor: KeyUpDownProcessor
	public size: ISize = {width: 0, height: 0}

	public constructor(options: IGameOptions) {
		const {gameTimer, gameObjectList, commandQueue, orderQueue, keyUpDownProcessor} = init(options)
		this.gameTimer = gameTimer
		this.gameObjectList = gameObjectList
		this.commandQueue = commandQueue
		this.orderQueue = orderQueue
		this.keyUpDownProcessor = keyUpDownProcessor

		const theSpaceshipObject = createSpaceshipObject({position: new Vector(500, 200)})
		gameObjectList.push(theSpaceshipObject)
		commandQueue.enqueue(createSpaceshipStartMoveCommand(theSpaceshipObject))
		commandQueue.enqueue(createSpaceshipStartMoveCorrectionCommand(theSpaceshipObject, () => this.size))

		commandQueue.enqueue(new RepeatableCommand(new InterpretOrderCommand))
		createKeyboardHandlers(keyUpDownProcessor, orderQueue)
	}

	public start() {
		this.gameTimer.start()
	}

	public pause() {
		this.gameTimer.pause()
	}

	public stop() {
		this.gameTimer.stop()
	}
}


/**
 * Создаем команду Поступательное движение космолета.
 * TODO Может это упростить? Создание абстрактной команды StartCommand.
 */
function createSpaceshipStartMoveCommand(theSpaceship: IUniversalObject) {
	return (
		new StartCommand(
			'MoveSpaceshipCommand',
			theSpaceship,
			new RepeatableCommand(new MoveCommand(resolve<IMovable>('Adapter', theSpaceship, IMovableReflectedTypeRef)))
		)
	)
}

/**
 * TODO Возможно стоит сделать команду MoveToroidCorrectionCommand и включить ее в khusamov-game-command-system
 * @param theSpaceship
 * @param getSize
 */
function createSpaceshipStartMoveCorrectionCommand(theSpaceship: IUniversalObject, getSize: () => ISize) {
	return (
		new StartCommand(
			'MoveCorrectionSpaceshipCommand',
			theSpaceship,
			new RepeatableCommand(
				new MoveCorrectionCommand(
					resolve<IMovable>('Adapter', theSpaceship, IMovableReflectedTypeRef),
					movable => {
						movable.position = positionCorrectionForToroid(movable.position, getSize)
					}
				)
			)
		)
	)
}