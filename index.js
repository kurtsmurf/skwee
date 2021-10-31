// @ts-check
import { toPath } from "./path.js";

const audioContext = new AudioContext();
const analyser = audioContext.createAnalyser();
const target = document.querySelector("[scope-mode]");
analyser.fftSize = 128;
const samplesHolder = new Float32Array(analyser.fftSize);

document.body.addEventListener("click", () => audioContext.resume());

const loop = () => {
  analyser.getFloatTimeDomainData(samplesHolder);
  const target = document.querySelector("[scope-path]");
  target.setAttribute("d", toPath(samplesHolder));
  requestAnimationFrame(loop);
};

const main = async () => {
  await navigator.mediaDevices
    .getUserMedia({ audio: true, video: false })
    .then((stream) => audioContext.createMediaStreamSource(stream))
    .then((streamSource) => streamSource.connect(analyser));

  requestAnimationFrame(loop);
};

main();
