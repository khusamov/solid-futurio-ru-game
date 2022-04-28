Обработка пользовательского ввода:
==================================

Отличается от web-приложений — cохраняем состояние нажатых клавиш, а учитываем ввод позже в момент вызова update()


```javascript
let inputState = {
  UP: false,
  DOWN: false,
  LEFT: false,
  RIGHT: false,
  ROTATE: false
};

// ...

let update = (step) => {
  if (inputState.LEFT)   posX--;
  if (inputState.RIGHT)  posX++;
  if (inputState.UP)     posY--;
  if (inputState.DOWN)   posY++;
  if (inputState.ROTATE) angle++;
};

```


Дополнительные устройства ввода:
--------------------------------
Клавиатура
Мышь (Pointer Lock API)
Touch
Gamepad API

Структура игры. Cцены
----------------------
Каждой сцене свой update() и render()

Код основной сцены:
-------------------

```javascript
class GameScene {
  constructor(game) {
    this.game = game;
    this.angle = 0;
    this.posX = game.canvas.width / 2;
    this.posY = game.canvas.height / 2;
  }
  update(dt) {
    if (this.game.keys['87']) this.posY--; // W
    if (this.game.keys['83']) this.posY++; // S
    if (this.game.keys['65']) this.posX--; // A
    if (this.game.keys['68']) this.posX++; // D
    if (this.game.keys['32']) this.angle++; // SPACE
    if (this.game.keys['27']) this.game.setScene(MenuScene); // Back to menu
  }
  render(dt, ctx, canvas) {
    ...
    ctx.fillStyle = '#0d0';
    ctx.fillRect(posX, posY, rectSize, rectSize);
  }
}

```

Код переключения сцен:
----------------------

```javascript
class Game {
  constructor() {
    this.setScene(IntroScene);
    this.initInput();
    this.startLoop();
  }
  initInput() {
    this.keys = {};
    document.addEventListener('keydown', e => { this.keys[e.which] = true; });
    document.addEventListener('keyup', e => { this.keys[e.which] = false; });
  }
  setScene(Scene) {
    this.activeScene = new Scene(this);
  }
  update(dt) {
    this.activeScene.update(dt);
  }
  render(dt) {
    this.activeScene.render(dt, this.ctx, this.canvas);
  }
}

```
