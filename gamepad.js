import { updateBaseHue, updateSpread } from "./updateBaseHue";

const update = () => {
    const inputX = navigator.getGamepads()[0].axes[0];
    const inputY = navigator.getGamepads()[0].axes[1];
    updateBaseHue(inputX * 4);
    updateSpread(inputY * 4);
}

const loop = () => { update(); requestAnimationFrame(loop); }

export const enableGamepadInput = () => window.addEventListener("gamepadconnected", loop);