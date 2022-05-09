Подсистема приказов
===================

Это часть системы команд 'khusamov-command-system'.

Пример создания приказа `IRelayCommandOrder`
--------------------------------------------

```typescript
register('RelayCommand', relayCommandResolver)

const spaceship = {
	linearVelocity: 100
}

function increaseLinearVelocityActionResolver(increment: number) {
	return () => {
		spaceship.linearVelocity += increment
	}
}

register('IncreaseLinearVelocityAction', increaseLinearVelocityActionResolver)

const relayCommandOrder = (
	createUniversalObject<IRelayCommandOrder<typeof increaseLinearVelocityActionResolver>>({
		type: 'RelayCommand',
		name: 'IncreaseLinearVelocityCommand',
		action: ['IncreaseLinearVelocityAction', 100]
	})
)

const myCommand = resolve<ICommand>(new OrderAdapter(relayCommandOrder).type, relayCommandOrder)
myCommand.execute()
```