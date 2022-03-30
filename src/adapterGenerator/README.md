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
		return this.iocContainer.resolve('Getter', this.universalObject, 'position');
	}
	get movementVelocity() {
		return this.iocContainer.resolve('Getter', this.universalObject, 'movementVelocity');
	}
	set position(value) {
		return this.iocContainer.resolve('Setter', this.universalObject, 'position', value).execute();
	}
	set movementVelocity(value) {
		return this.iocContainer.resolve('Setter', this.universalObject, 'movementVelocity', value).execute();
	}
}
```