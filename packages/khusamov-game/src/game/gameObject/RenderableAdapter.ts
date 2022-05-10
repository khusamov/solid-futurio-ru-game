import {Adapter} from 'khusamov-universal-object';
import IRenderable from './IRenderable';

export default class RenderableAdapter extends Adapter implements IRenderable {
	public get renderComponent(): string {
		return this.universalObject.getValue('renderComponent', 'UnknownObject')
	}

	public set renderComponent(value: string) {
		this.universalObject.setValue('renderComponent', value)
	}
}