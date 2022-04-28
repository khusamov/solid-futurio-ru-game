
// https://eatdog.com.ua/assets/gamedev-slides/demos/gameloop-bad.html
// Простой и ненадёжный способ:
// Cкорость игры напрямую зависит от количества FPS
// requestAnimationFrame(() => {
//   angle++;
//   render();
//   ...
// });

// main functions
let canvas = document.querySelector('canvas'),
	ctx = canvas.getContext('2d'),
	rectSize = 150,
	angle = 0;

let update = (dt) => {
	angle++;
	angle %= 360;
};

let render = () => {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.save();
	ctx.translate(canvas.width / 2, canvas.height / 2);
	ctx.rotate(angle * Math.PI / 180);
	ctx.translate(-rectSize / 2, -rectSize / 2);
	ctx.fillStyle = '#d00';
	ctx.fillRect(0, 0, rectSize, rectSize);
	ctx.restore();
};

// override requestAnimationFrame to emulate different FPS count (same in all gameloop examples)
window.requestAnimationFrame = (func) => {
	clearTimeout(window.rafTimer);
	window.rafTimer = setTimeout(func, 1000 / (window.maxFPS || 60));
};

// game loop
let frame = () => {
	update();
	render();
	requestAnimationFrame(frame);
};

requestAnimationFrame(frame);