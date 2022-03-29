adapterGenerator
================

Генерирует код следующего вида:

```typescript
// implements IMovable
class {
	constructor(universalObject) {
		this.universalObject = universalObject;
	}

	get position() {
		return IoC.resolve('IMovable.position.getter', this.universalObject);
	}
	get movementVelocity() {
		return IoC.resolve('IMovable.movementVelocity.getter', this.universalObject);
	}
	set position() {
		return IoC.resolve('IMovable.position.setter', this.universalObject).execute();
	}
	set movementVelocity() {
		return IoC.resolve('IMovable.movementVelocity.setter', this.universalObject).execute();
	}
}
```