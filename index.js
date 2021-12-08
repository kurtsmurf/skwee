// @ts-check
import { enableGamepad } from "./enableGamepad.js"
import { enableStart } from "./enableStart.js";
import { enableDrag } from "./enableDrag.js";
import { enableArrowKeys } from "./enableArrowKeys.js";

// Randomize initial hue/spread properties
document.body.style.setProperty("--base-hue", `${Math.random() * 360}`);
document.body.style.setProperty("--spread", `${Math.random() * 720}`);

enableGamepad()
enableStart()
enableDrag()
enableArrowKeys()