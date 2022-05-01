import {ICommand, IQueue, ISize, KeyUpDownProcessor, Queue} from 'khusamov-base-types';
import {IUniversalObject} from 'khusamov-universal-object';
import {createCommandQueue} from 'khusamov-command-system';
import createTheSpaceshipKeyboardHandlers from './keyboardShortcut/createTheSpaceshipKeyboardHandlers';

export default class Game {
	public gameObjectList: Record<string, any>[]
	public commandQueue: IQueue<ICommand>
	public orderQueue: IQueue<IUniversalObject>
	public keyUpDownProcessor: KeyUpDownProcessor
	public worldSize: ISize = {width: 0, height: 0}

	constructor() {
		this.gameObjectList = []
		this.commandQueue = createCommandQueue() // Очередь команд создается по особому!
		this.orderQueue = new Queue
		this.keyUpDownProcessor = new KeyUpDownProcessor
		createTheSpaceshipKeyboardHandlers()
	}
}