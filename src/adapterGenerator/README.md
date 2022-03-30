adapterGenerator
================

Генерирует код следующего вида:

```typescript
class MovableAdapter {
	constructor(universalObject, iocContainer) {
		this.universalObject = universalObject;
		this.iocContainer = iocContainer;
	}

	get position() {
		return this.iocContainer.resolve('IMovable.position.getter', this.universalObject);
	}
	get movementVelocity() {
		return this.iocContainer.resolve('IMovable.movementVelocity.getter', this.universalObject);
	}
	set position(value) {
		return this.iocContainer.resolve('IMovable.position.setter', value).execute();
	}
	set movementVelocity(value) {
		return this.iocContainer.resolve('IMovable.movementVelocity.setter', value).execute();
	}
}
```