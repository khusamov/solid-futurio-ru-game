Инверсия управления
===================

```typescript
type TResolverFunction = (...params: any[]) => any

// Система IoC состоит из двух функций: resolve() и register(). Здесь представлены их болванки:
function resolve<T, P extends TResolverFunction = TResolverFunction>(dependencyName: string, ...params: Parameters<P>): T {
	return 0 as any
}
function register(dependencyName: string, resolver: TResolverFunction) {}

// Где-то есть класс Pirat, который был создан неизвестным разработчиком.
class Pirat {
	// ...
}

// Регистрируем зависимость Pirat, которая будет возвращать экземпляр класса Pirat.
type TPiratResolver = (weapons: string[], bomb: number) => Pirat
const piratResolver: TPiratResolver = (weapons, bomb) => { return new Pirat }
register('Pirat', piratResolver)

// Разрешаем зависимость в строгом (через тип или через функцию) и обычном режиме:
resolve<Pirat, TPiratResolver>('Pirat', [], 1)
resolve<Pirat, typeof piratResolver>('Pirat', [], 1)
resolve<Pirat>('Pirat', [], 1)
```