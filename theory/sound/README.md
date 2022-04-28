А как же звук?
==============

Web Audio API
https://webaudio.github.io/web-audio-api/

```javascript
let context = new AudioContext();

fetch('sounds/music.mp3').then(response => {
  response.arrayBuffer().then(arrayBuffer => {
    context.decodeAudioData(arrayBuffer, buffer => {
      let source = context.createBufferSource();
      source.buffer = buffer;
      source.connect(context.destination);
      source.start(0);
    });
  });
});
```

