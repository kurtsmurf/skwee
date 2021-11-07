// @ts-check
import { toPath } from "./path.js";

const audioContext = new AudioContext();
const analyser = audioContext.createAnalyser();
analyser.fftSize = 128;

const samplesHolder = new Float32Array(analyser.fftSize);
const scopePath = document.querySelector("[scope-path]");

const draw = () => {
  analyser.getFloatTimeDomainData(samplesHolder);
  scopePath.setAttribute("d", toPath(samplesHolder));
};

const loop = () => {
  draw();
  requestAnimationFrame(loop);
};

const startStop = () => {
  if (audioContext.state === "suspended") return audioContext.resume();
  if (audioContext.state === "running") return audioContext.suspend();
};

const interactive = () => {
  document.body.addEventListener("click", startStop);
};

let str;
navigator.mediaDevices
  .getUserMedia({ audio: true, video: false })
  .then((stream) => audioContext.createMediaStreamSource(stream))
  .then((streamSource) => {
    str = streamSource;
    streamSource.connect(analyser)
  })
  .then(loop)
  .then(interactive);
