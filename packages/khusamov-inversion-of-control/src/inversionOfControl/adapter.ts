import {ReflectedTypeRef} from 'typescript-rtti/src/lib/reflect';
import {IUniversalObject} from 'khusamov-base-types';
import IoC from './IoC';

// export default function adapter<T>(universalObject: IUniversalObject, reflectedTypeRef: ReflectedTypeRef): T {
// 	return IoC.resolve<T>('Adapter', universalObject, reflectedTypeRef)
// }

export default function adapter() {}