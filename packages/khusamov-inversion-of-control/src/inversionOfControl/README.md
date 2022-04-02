Контейнер инверсии управления
=============================

Простая реализация шаблона проектирования '[Контейнер инверсии управления][ioc]' (Inversion оf Control Container).

Пример использования:
---------------------

```typescript
import {IoC} from './inversionOfControl';
const iocContainer = new IoC()

function myDependencyResolver(): Array<string> {
	return ['Apple', 'iPhone', 'iPad']
}

// Регистрация зависимости.
iocContainer.resolve<IRegistrator>('Registrator', 'myDependency', myDependencyResolver).register()

// Разрешение зависимости.
const arr1 = iocContainer.resolve<Array<string>>('myDependency')
```

Функция, разрешающая зависимость `function *Resolver()`
-------------------------------------------------------

Функция, разрешающая зависимость, должна следовать описанию:

```typescript
type TResolverFunction = (...args: Array<any>) => any
```

Причем последний аргумент является объектом `IResolverContext`, который предоставляет ссылки 
на контейнер и описание типа `<T>`, который указывается при вызове метода `resolve<T>()` контейнера.
Например:

```typescript
import {IResolverContext} from '../inversionOfControl';
const myResolver: TResolverFunction = (arg1: string, arg2: number, context: IResolverContext) => {
	// Тело функции резольвера.
}
```

[ioc]: https://bit.ly/35sJch2