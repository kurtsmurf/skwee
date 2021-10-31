// @ts-check
import { toPath } from "./path.js";

const audioContext = new AudioContext();
document.body.addEventListener("click", () => audioContext.resume());

const analyser = audioContext.createAnalyser();
analyser.fftSize = 128;

const samplesHolder = new Float32Array(analyser.fftSize);
const path = document.querySelector("[scope-path]");

const loop = () => {
  analyser.getFloatTimeDomainData(samplesHolder);
  path.setAttribute("d", toPath(samplesHolder.slice(-100)));
  requestAnimationFrame(loop);
};

navigator.mediaDevices
  .getUserMedia({ audio: true, video: false })
  .then((stream) => audioContext.createMediaStreamSource(stream))
  .then((streamSource) => streamSource.connect(analyser))
  .then(loop);
