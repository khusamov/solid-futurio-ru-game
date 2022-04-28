
// https://eatdog.com.ua/assets/gamedev-slides/demos/webaudio-demo.html


// create web audio context
let context = new AudioContext();
musicGainNode = context.createGain(),
	sfxGainNode = context.createGain(),
	testSoundBuffer = null;

// set default music volume
musicGainNode.gain.value = 0.25;

// load and play background music
fetch('sounds/music.mp3').then(function(response) {
	response.arrayBuffer().then(function(arrayBuffer) {
		context.decodeAudioData(arrayBuffer, function(buffer) {
			let source = context.createBufferSource();
			source.loop = true;
			source.buffer = buffer;
			source.connect(musicGainNode);
			musicGainNode.connect(context.destination);
			source.start(0);
		});
	});
});

// load test sound
fetch('sounds/sound.mp3').then(function(response) {
	response.arrayBuffer().then(function(arrayBuffer) {
		context.decodeAudioData(arrayBuffer, function(buffer) {
			testSoundBuffer = buffer;
		});
	});
});

let setMusicVolume = (volume) => {
	musicGainNode.gain.value = volume;
}

let setSfxVolume = (volume) => {
	sfxGainNode.gain.value = volume;
}

let playSound = () => {
	if (testSoundBuffer) {
		let source = context.createBufferSource();
		source.buffer = testSoundBuffer;
		source.connect(sfxGainNode);
		sfxGainNode.connect(context.destination);
		source.start(0);
	}
};