
// https://eatdog.com.ua/assets/gamedev-slides/demos/gameloop-good.html
// Фиксированный шаг между кадрами:
// Гарантирует постоянный интервал для update()
// let dt   = 0,
//     step = 1 / 60,
//     last = performance.now();
//
// requestAnimationFrame(() => {
//   let now = performance.now();
//   dt += (now - last) / 1000;
//   while(dt > step) {
//     dt -= step;
//     angle++;
//   }
//   last = now;
//   render(dt);
//   ...
// });

// main functions
let canvas = document.querySelector('canvas'),
	ctx = canvas.getContext('2d'),
	rectSize = 150,
	angle = 0;

let update = (step) => {
	angle++;
	angle %= 360;
};

let render = () => {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.save();
	ctx.translate(canvas.width / 2, canvas.height / 2);
	ctx.rotate(angle * Math.PI / 180);
	ctx.translate(-rectSize / 2, -rectSize / 2);
	ctx.fillStyle = '#0d0';
	ctx.fillRect(0, 0, rectSize, rectSize);
	ctx.restore();
};

// override requestAnimationFrame to emulate different FPS count (same in all gameloop examples)
window.requestAnimationFrame = (func) => {
	clearTimeout(window.rafTimer);
	window.rafTimer = setTimeout(func, 1000 / (window.maxFPS || 60));
};

// game loop
let last = performance.now(),
	step = 1 / 60, // update should be called 60 times per second
	dt = 0,
	now;

let frame = () => {
	now = performance.now();
	dt += (now - last) / 1000;
	while(dt > step) {
		dt = dt - step;
		update(step);
	}
	last = now;

	render();
	requestAnimationFrame(frame);
}

requestAnimationFrame(frame);