// @ts-check
import { toPath } from "./path.js";
import { updateBaseHue, updateSpread } from "./updateCustomProperty.js"

export const start = () => {
  const audioContext = new AudioContext();
  const analyser = audioContext.createAnalyser();
  const scopePath = document.querySelector("[scope-path]");

  const fftSize = 128;
  const samplesHolder = new Float32Array(fftSize);
  analyser.fftSize = fftSize;

  let paused = false;

  const enablePause = () => {
    const toggle = () => paused = !paused;
    const toggleOnSpace = (e) => e.code === "Space" && toggle();
    document.body.addEventListener("keydown", toggleOnSpace);
  };

  const drawPath = () => {
    if (paused) return;
    analyser.getFloatTimeDomainData(samplesHolder);
    scopePath.setAttribute("d", toPath(samplesHolder));
  };
  
  const animate = () => {
    drawPath();

    updateBaseHue(avg() * 10);
    updateSpread(avg() * 5)



    requestAnimationFrame(animate);
  };

  const avg = () => [...samplesHolder]
    .map(Math.abs)
    .reduce((a, b) => a + b, 0) / samplesHolder.length

  navigator.mediaDevices
    .getUserMedia({ audio: true, video: false })
    .then((stream) => audioContext.createMediaStreamSource(stream))
    .then((streamSource) => streamSource.connect(analyser))
    .then(animate)
    .then(enablePause);

  const enableFlow = () => {
    const flow = () => {

    };
    requestAnimationFrame(flow);
  }

  enableFlow()
};