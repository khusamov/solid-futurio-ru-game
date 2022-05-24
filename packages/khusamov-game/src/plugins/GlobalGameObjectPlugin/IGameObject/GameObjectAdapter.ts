import IGameObject from './IGameObject';
import {Adapter} from 'khusamov-universal-object';

export default class GameObjectAdapter extends Adapter implements IGameObject {
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