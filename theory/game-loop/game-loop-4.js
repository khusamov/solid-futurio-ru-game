
// https://eatdog.com.ua/assets/gamedev-slides/demos/fixed-step.html
// Различный FPS для update() и render():
// (используется LERP для отрисовки промежуточных кадров)
// let lerp = (start, finish, time) => {
//   return start + (finish - start) * time;
// };

// main functions
let canvas = document.querySelector('canvas'),
	ctx = canvas.getContext('2d'),
	rectSize = 100,
	direction = 1,
	posX = rectSize * 3,
	posY = 70,
	angle = 0,
	prevAngle = angle,
	prevX = posX;

let update = (step) => {
	prevX = posX;
	prevAngle = angle;

	posX += 10 * direction;
	angle += 5 * direction;
	angle %= 360;

	if (posX + rectSize > canvas.width) direction = -1;
	else if (posX - rectSize * 3 < 0) direction = 1;
};

let drawRect = (x, y, rotateAngle) => {
	ctx.save();
	ctx.translate(x, y);
	ctx.rotate(rotateAngle * Math.PI / 180);
	ctx.translate(-rectSize / 2, -rectSize / 2);
	ctx.fillStyle = '#0d0';
	ctx.fillRect(0, 0, rectSize, rectSize);
	ctx.restore();
};

let lerp = (start, finish, time) => {
	return start + (finish - start) * time;
};

let render = (dt) => {
	// clear canvas
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	// draw game state rect
	drawRect(posX, posY, angle);

	// draw rect using LERP
	let smoothY = posY + rectSize * 2,
		smoothX = lerp(prevX, posX, dt),
		smoothAngle = lerp(prevAngle, angle, dt);
	drawRect(smoothX, smoothY, smoothAngle);

	// add info labels
	ctx.font = "30px Arial";
	ctx.fillText("update @10fps", 0, posY + 15);
	ctx.fillText("render @60fps", 0, posY + rectSize * 2 + 15);
};

// game loop
let last = performance.now(),
	fps = 10,
	step = 1 / fps,
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

	render(dt * fps);
	requestAnimationFrame(frame);
}

requestAnimationFrame(frame);