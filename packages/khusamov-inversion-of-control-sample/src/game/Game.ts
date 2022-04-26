import init from './init';
import {ISize, IUniversalObject, KeyUpDownProcessor, Queue, Timer, Vector} from 'khusamov-base-types';
import {AgentMessageInterpretCommand, CommandQueue, StartCommand} from 'khusamov-command-system';
import createSpaceshipObject from './createSpaceshipObject';
import createKeyboardHandlers from './createKeyboardHandlers';
import {IMovable, IMovableReflectedTypeRef, MoveCommand, MoveCorrectionCommand} from 'khusamov-game-command-system';
import {resolve} from 'khusamov-inversion-of-control';
import IGameOptions from './IGameOptions';
import positionCorrectionForToroid from './positionCorrectionForToroid';

export default class Game {
	public gameTimer: Timer
	public gameObjectList: IUniversalObject[]
	public commandQueue: CommandQueue
	public agentMessageQueue: Queue<IUniversalObject>
	public keyUpDownProcessor: KeyUpDownProcessor
	public size: ISize = {width: 0, height: 0}

	public constructor(options: IGameOptions) {
		const {gameTimer, gameObjectList, commandQueue, agentMessageQueue, keyUpDownProcessor} = init(options)
		this.gameTimer = gameTimer
		this.gameObjectList = gameObjectList
		this.commandQueue = commandQueue
		this.agentMessageQueue = agentMessageQueue
		this.keyUpDownProcessor = keyUpDownProcessor

		const theSpaceshipObject = createSpaceshipObject({position: new Vector(500, 200)})
		gameObjectList.push(theSpaceshipObject)
		commandQueue.enqueue(createSpaceshipStartMoveCommand(theSpaceshipObject))
		commandQueue.enqueue(createSpaceshipStartMoveCorrectionCommand(theSpaceshipObject, () => this.size))

		commandQueue.enqueue(new AgentMessageInterpretCommand)
		createKeyboardHandlers(keyUpDownProcessor, agentMessageQueue)
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
			new MoveCommand(resolve<IMovable>('Adapter', theSpaceship, IMovableReflectedTypeRef)),
			'MoveSpaceshipCommand',
			theSpaceship
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
			new MoveCorrectionCommand(
				resolve<IMovable>('Adapter', theSpaceship, IMovableReflectedTypeRef),
				movable => {
					movable.position = positionCorrectionForToroid(movable.position, getSize)
				}
			),
			'MoveCorrectionSpaceshipCommand',
			theSpaceship
		)
	)
}