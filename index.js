// @ts-check
import { enableGamepadInput } from "./gamepad.js"
import { enableTouchToBegin } from "./enableTouchToBegin";
import { enableDrag } from "./enableDrag";

// Randomize initial hue/spread properties
document.body.style.setProperty("--base-hue", `${Math.random() * 360}`);
document.body.style.setProperty("--spread", `${Math.random() * 720}`);

// Handle gamepad input
enableGamepadInput()
enableTouchToBegin()
enableDrag()