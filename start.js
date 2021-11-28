// @ts-check
import { toPath } from "./path.js";

export const start = () => {
  const audioContext = new AudioContext();
  const analyser = audioContext.createAnalyser();
  const scopePath = document.querySelector("[scope-path]");

  const fftSize = 128;
  const samplesHolder = new Float32Array(fftSize);
  analyser.fftSize = fftSize;

  let paused = false;

  const draw = () => {
    if (paused) return;
    analyser.getFloatTimeDomainData(samplesHolder);
    scopePath.setAttribute("d", toPath(samplesHolder));
  };
  
  const animate = () => {
    draw();
    requestAnimationFrame(animate);
  };

  const enablePause = () => {
    const toggle = () => paused = !paused;
    const toggleOnSpace = (e) => e.code === "Space" && toggle();
    document.body.addEventListener("keydown", toggleOnSpace);
  };

  navigator.mediaDevices
    .getUserMedia({ audio: true, video: false })
    .then((stream) => audioContext.createMediaStreamSource(stream))
    .then((streamSource) => streamSource.connect(analyser))
    .then(animate)
    .then(enablePause);
};
