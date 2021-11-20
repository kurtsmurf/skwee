// @ts-check
import { start } from "./start.js";

document.body.style.setProperty("--base-hue", `${Math.random() * 360}`);

// --

const prompt = document.querySelector("figure");
prompt.addEventListener("pointerdown", () => {
  start();
  prompt.style.setProperty("display", "none");
});

// --

let dragStart;
let baseHue;

const drag = (e) => {
  const newValue = (baseHue + (e.x - dragStart) / 5) % 360;
  document.body.style.setProperty("--base-hue", newValue.toString());
};
const startDrag = (e) => {
  dragStart = e.x;
  baseHue = parseFloat(document.body.style.getPropertyValue("--base-hue"));
  document.body.addEventListener("pointermove", drag);
};
const stopDrag = () => {
  dragStart = undefined;
  document.body.removeEventListener("pointermove", drag);
};

document.body.addEventListener("pointerdown", startDrag);
document.body.addEventListener("pointerup", stopDrag);
document.body.addEventListener("pointerleave", stopDrag);
