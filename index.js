// @ts-check
import { toPath } from "./move.js";

const audioContext = new AudioContext();
const analyser = audioContext.createAnalyser();
const target = document.querySelector("[data-mode]");
analyser.fftSize = 128;
const samplesHolder = new Float32Array(analyser.fftSize);

document.body.addEventListener("click", () => audioContext.resume());

const act = () => {
  analyser.getFloatTimeDomainData(samplesHolder);
  const target = document.querySelector("[data-target]");
  target.setAttribute("d", toPath(samplesHolder));
  requestAnimationFrame(act);
};

const main = async () => {
  await navigator.mediaDevices
    .getUserMedia({ audio: true, video: false })
    .then((stream) => audioContext.createMediaStreamSource(stream))
    .then((streamSource) => streamSource.connect(analyser));

  requestAnimationFrame(act);
};

main();
