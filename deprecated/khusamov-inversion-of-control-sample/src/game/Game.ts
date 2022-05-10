import {ICommand, IQueue, ISize, KeyUpDownProcessor, Timer, Vector} from 'khusamov-base-types';
import {IUniversalObject} from 'khusamov-universal-object';
import {InterpretOrderCommand, RepeatableCommand} from 'khusamov-command-system';
import IGameOptions from './IGameOptions';
import createSpaceshipObject from './createSpaceshipObject';
import createKeyboardHandlers from './createKeyboardHandlers';
import createSpaceshipStartMoveCommand from './createSpaceshipStartMoveCommand';
import createSpaceshipStartMoveCorrectionCommand from './createSpaceshipStartMoveCorrectionCommand';
import init from './init';

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