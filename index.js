//@ts-check
import { toPath } from "./path.js";

const start = () => {
  const audioContext = new AudioContext();
  const analyser = audioContext.createAnalyser();
  const scopePath = document.querySelector("[scope-path]");

  const fftSize = 128;
  const samplesHolder = new Float32Array(fftSize);
  analyser.fftSize = fftSize;

  const draw = () => {
    analyser.getFloatTimeDomainData(samplesHolder);
    scopePath.setAttribute("d", toPath(samplesHolder));
  };

  const loop = () => {
    draw();
    requestAnimationFrame(loop);
  };

  navigator.mediaDevices
    .getUserMedia({ audio: true, video: false })
    .then((stream) => audioContext.createMediaStreamSource(stream))
    .then((streamSource) => streamSource.connect(analyser))
    .then(loop);
};

document.body.addEventListener("click", () => {
  start();
  document.body.removeEventListener("click", start);
});
