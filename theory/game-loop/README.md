Разработка игр на JavaScript
============================

http://gs-studio.com/news-about-it/30703----javascript  
https://eatdog.com.ua/assets/gamedev-slides/  
https://www.youtube.com/watch?v=-gsjAz9jR3Y  

Игра целиком
https://github.com/inferpse/clanbomber


Почему именно фиксированный timestep?
-------------------------------------
Упрощение кода update()
Предсказуемость поведения игры
Возможность создания replay игровой сцены
Возможность легкого замедления/ускорения игры (slomo)
Стабильная работа физики

Реализация fixed timestep:
-------------------------

еще одна проблема, которую нужно решить — неактивные вкладки браузера. С текущим кодом, 
если пользователь на несколько минут сделает вкладку неактивной, а потом вернется, 
код для update() будет вызван очень много раз за все время отсутствия, 
и игровая логика может убежать далеко вперёд. Конечно, можно продумать механизмы вроде 
паузы состояния игры, но все равно стоит избавиться от многократного вызова update().

Подобные случаи можно проконтролировать и разрешить максимальную задержку между вызовами 
не более, чем 1 секунда. Собрав всё вышесказанное вместе, получаем код, который 
можно использовать как заготовку для создания игры:

```javascript
let last = performance.now(),
    step = 1 / 60,
    dt = 0,
    now;

let frame = () => {
  now = performance.now();
  dt = dt + Math.min(1, (now - last) / 1000); // исправление проблемы неактивных вкладок
  while(dt > step) {
    dt = dt - step;
    update(step);
  }
  last = now;

  render(dt);
  requestAnimationFrame(frame);
}

requestAnimationFrame(frame);
```

Линейная интерполяция
---------------------

```javascript
let lerp = (start, finish, time) => {
  return start + (finish - start) * time;
};
```

Добавляем поддержку slow motion:
--------------------------------

```javascript
let last = performance.now(),
    fps = 60,
    slomo = 1, // slow motion multiplier
    step = 1 / fps,
    slowStep = slomo * step,
    dt = 0,
    now;

let frame = () => {
  now = performance.now();
  dt = dt + Math.min(1, (now - last) / 1000);
  while(dt > slowStep) {
    dt = dt - slowStep;
    update(step);
  }
  last = now;

  render(dt / slomo * fps);
  requestAnimationFrame(frame);
}

requestAnimationFrame(frame);
```


Производительность кода
-----------------------
Оптимизация кода отрисовки
(несколько canvas, легкие операции, субпиксельный рендеринг, webgl)

Оптимизация кода логики игры
(меньше замыканий, pool объектов)

Рендеринг только при необходимости
(подходит не для всех типов игр)

Использование минимального FPS для логики/отрисовки
(снизит нагрузку и энергопотребление)




