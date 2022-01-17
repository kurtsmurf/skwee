// @ts-check
import { toPath } from "./path.js";
import { updateBaseHue, updateSpread } from "./updateCustomProperty.js";

const scopePath = document.querySelector("[scope-path]");
const fftSize = 128;
const samplesHolder = new Float32Array(fftSize);
const avg = () =>
  [...samplesHolder]
    .map(Math.abs)
    .reduce((a, b) => a + b, 0) / samplesHolder.length;

let paused = false;
const enablePause = () => {
  const toggle = () => paused = !paused;
  const toggleOnSpace = (e) => e.code === "Space" && toggle();
  document.body.addEventListener("keydown", toggleOnSpace);
};

export const start = () => {
  const audioContext = new AudioContext();
  const analyser = audioContext.createAnalyser();
  analyser.fftSize = fftSize;
  const drawPath = () => {
    if (paused) return;
    analyser.getFloatTimeDomainData(samplesHolder);
    scopePath.setAttribute("d", toPath(samplesHolder));
  };

  let lastAnimationFrameTime = 0;
  const animate = () => {
    if (!lastAnimationFrameTime) {
      lastAnimationFrameTime = Date.now()
    } else if (lastAnimationFrameTime + 16 < Date.now()) {
      lastAnimationFrameTime = Date.now()
      drawPath();
      updateBaseHue(avg() * 10);
      updateSpread(avg() * 5);
    }

    requestAnimationFrame(animate);
  };
  navigator.mediaDevices
    .getUserMedia({ audio: true, video: false })
    .then((stream) => audioContext.createMediaStreamSource(stream))
    .then((streamSource) => streamSource.connect(analyser))
    .then(animate)
    .then(enablePause);
};
