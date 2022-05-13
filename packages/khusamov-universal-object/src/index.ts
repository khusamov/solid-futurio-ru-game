export {default as Adapter} from './types/Adapter'
export {default as UniversalObject} from './types/UniversalObject'
export type {default as IUniversalObject, TUniversalItems, TUniversalValueName} from './types/IUniversalObject'
export {isUniversalObject} from './types/IUniversalObject'
export {default as UniversalObjectAdapter} from './types/UniversalObjectAdapter'

export {default as createUniversalObject} from './functions/createUniversalObject'
export {default as universalObjectResolver} from './functions/universalObjectResolver'
export {default as findUniversalObject} from './functions/findUniversalObject'
export {default as createAdapter} from './functions/createAdapter'

export {default as fillUniversalObject} from './functions/fillUniversalObject'
export {default as withoutType} from './functions/withoutType'