// @ts-check
import { start } from "./start.js";

document.body.style.setProperty("--base-hue", `${Math.random() * 360}`);

const svg = document.querySelector("svg");

svg.addEventListener("click", function clickHandler() {
  start();
  svg.removeEventListener("click", clickHandler);
});

let dragStart;
let baseHue;

const handlePointerMove = (e) => {
  const newValue = (baseHue + (e.x - dragStart) / 5) % 360
  document.body.style.setProperty("--base-hue", newValue.toString());
};

document.body.onpointerdown = (e) => {
  dragStart = e.x;
  baseHue = parseFloat(document.body.style.getPropertyValue("--base-hue"));
  document.body.addEventListener("pointermove", handlePointerMove)
};

document.body.onpointerup = document.body.onpointerleave = () => {
  dragStart = undefined;
  document.body.removeEventListener("pointermove", handlePointerMove)
}
