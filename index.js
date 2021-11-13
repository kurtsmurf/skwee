// @ts-check
import { start } from "./start.js";

document.body.style.setProperty("--base-hue", `${Math.random() * 360}`);

const svg = document.querySelector("svg");
svg.addEventListener("click", function clickHandler() {
  start();
  svg.removeEventListener("click", clickHandler);
});
