import { updateBaseHue, updateSpread } from "./updateCustomProperty.js";

const update = () => {
    const inputX = navigator.getGamepads()[0].axes.filter((_, i) => i % 2 == 0).reduce((acc, cur) => acc + cur, 0);
    const inputY = navigator.getGamepads()[0].axes.filter((_, i) => i % 2 == 1).reduce((acc, cur) => acc + cur, 0);
    updateBaseHue(inputX * 4);
    updateSpread(inputY * 4);
}

const loop = () => { update(); requestAnimationFrame(loop); }

export const enableGamepad = () => window.addEventListener("gamepadconnected", loop);