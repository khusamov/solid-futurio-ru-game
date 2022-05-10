import {reflect} from 'typescript-rtti';
import IMovable from './IMovable';

const IMovableReflectedTypeRef = reflect<IMovable>()

export default IMovableReflectedTypeRef