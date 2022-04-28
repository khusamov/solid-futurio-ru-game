
// https://eatdog.com.ua/assets/gamedev-slides/demos/user-input.html
// Обработка пользовательского ввода:
// (W, S, A, D, SPACE)

// main functions
let canvas = document.querySelector('canvas'),
	ctx = canvas.getContext('2d'),
	inputState = { UP: false, DOWN: false, LEFT: false, RIGHT: false, ROTATE: false },
	rectSize = 150,
	angle = 0,
	posX = canvas.width / 2, // Don't use pixels in game logic! This is only for example
	posY = canvas.height / 2;

// handle user input
let setKeyState = function(keyCode, isPressed) {
	switch (keyCode) {
		case 65: inputState.LEFT = isPressed; break;
		case 87: inputState.UP = isPressed; break;
		case 68: inputState.RIGHT = isPressed; break;
		case 83: inputState.DOWN = isPressed; break;
		case 32: inputState.ROTATE = isPressed; break;
	}
};
let keydownHandler = (e) => {
	setKeyState(e.which, true);
};
let keyupHandler = (e) => {
	setKeyState(e.which, false);
};
document.addEventListener('keydown', keydownHandler);
document.addEventListener('keyup', keyupHandler);

let update = (step) => {
	if (inputState.LEFT) posX--;
	if (inputState.RIGHT) posX++;
	if (inputState.UP) posY--;
	if (inputState.DOWN) posY++;
	if (inputState.ROTATE) angle++;
};

let render = () => {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.save();
	ctx.translate(posX, posY);
	ctx.rotate(angle * Math.PI / 180);
	ctx.translate(-rectSize / 2, -rectSize / 2);
	ctx.fillStyle = '#0d0';
	ctx.fillRect(0, 0, rectSize, rectSize);
	ctx.restore();
};

// game loop
let last = performance.now(),
	step = 1 / 60, // update should be called 60 times per second
	dt = 0,
	now;

let frame = () => {
	now = performance.now();
	dt = dt + (now - last) / 1000;
	while(dt > step) {
		dt = dt - step;
		update(step);
	}
	last = now;

	render(dt);
	requestAnimationFrame(frame);
}

requestAnimationFrame(frame);