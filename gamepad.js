const adjustHue = input => {
    const current = parseFloat(document.body.style.getPropertyValue("--base-hue"));
    const next = current + input * 4;
    document.body.style.setProperty("--base-hue", next.toString());
}

const adjustSpread = input => {
    const current = parseFloat(document.body.style.getPropertyValue("--spread"));
    const next = current + input * 4;
    document.body.style.setProperty("--spread", next.toString());
}

const blah = () => {
    const inputX = navigator.getGamepads()[0].axes[0];
    const inputY = navigator.getGamepads()[0].axes[1];
    adjustHue(inputX);
    adjustSpread(inputY);
}

const run = () => { blah(); requestAnimationFrame(run); }

export const watchOutForGamePad = () => window.addEventListener("gamepadconnected", run);