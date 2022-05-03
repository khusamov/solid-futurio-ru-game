import IGameObject from './IGameObject';
import {IUniversalObject} from 'khusamov-universal-object';

export default class GameObjectAdapter implements IGameObject {
	public constructor(private universalObject: IUniversalObject) {}

	public get kind(): string[] {
		return this.universalObject.getValue('kind', ['IGameObject'])
	}

	public set kind(value: string[]) {
		this.universalObject.setValue('kind', value)
	}

	public get name(): string {
		return this.universalObject.getValue('name', 'theGameObject')
	}

	public set name(value: string) {
		this.universalObject.setValue('name', value)
	}
}