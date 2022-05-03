Инверсия управления
===================

```typescript
// Система IoC состоит из двух функций: resolve() и register(). Здесь представлены из болванки:
function resolve<T, P extends any[] = any[]>(dependencyName: string, ...params: P): T {
	return 0 as any
}
type TResolverFunction = (...params: any[]) => any
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
resolve<Pirat, Parameters<TPiratResolver>>('Pirat', [], 1)
resolve<Pirat, Parameters<typeof piratResolver>>('Pirat', [], 1)
resolve<Pirat>('Pirat', [], 1)
```