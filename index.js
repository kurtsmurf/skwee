// @ts-check
import { start } from "./start.js";
import { watchOutForGamePad } from "./gamepad.js"

watchOutForGamePad()

document.body.style.setProperty("--base-hue", `${Math.random() * 360}`);
document.body.style.setProperty("--spread", `${Math.random() * 720}`);

const prompt = document.querySelector("figure");
prompt.addEventListener("pointerdown", () => {
  start();
  prompt.style.setProperty("display", "none");
});

/** @type {number} */
let baseHue;
const updateBaseHue = (delta) => {
  const newValue = (baseHue + delta / 5) % 360;
  document.body.style.setProperty("--base-hue", newValue.toString());
};
const startBaseHueUpdate = () => {
  baseHue = parseFloat(document.body.style.getPropertyValue("--base-hue"));
};

/** @type {number} */
let spread;
const updateSpread = (delta) => {
  let newValue = (spread + delta / 5) % 720;
  document.body.style.setProperty("--spread", newValue.toString());
};
const startSpreadUpdate = () => {
  spread = parseFloat(document.body.style.getPropertyValue("--spread"));
};

/** @type {{x: number, y:number}} */
let dragStart;
const drag = (e) => {
  updateBaseHue(e.x - dragStart.x);
  updateSpread(e.y - dragStart.y);
};
const startDrag = (e) => {
  document.body.addEventListener("pointermove", drag);
  dragStart = { x: e.x, y: e.y };
  startBaseHueUpdate();
  startSpreadUpdate();
};
const stopDrag = () => {
  document.body.removeEventListener("pointermove", drag);
  dragStart = undefined;
};

document.body.addEventListener("pointerdown", startDrag);
document.body.addEventListener("pointerup", stopDrag);
document.body.addEventListener("pointerleave", stopDrag);
