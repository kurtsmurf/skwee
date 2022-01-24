// @ts-check
import { updateBaseHue, updateSpread } from "./updateCustomProperty.js";

const delta = 2.5;

export const enableArrowKeys = () => {
  window.addEventListener("keydown", (e) => {
    if (!e.key.startsWith("Arrow")) return;
    const direction = e.key.slice("Arrow".length);

    switch (direction) {
      case "Up":
        return updateSpread(delta);
      case "Down":
        return updateSpread(delta * -1);
      case "Left":
        return updateBaseHue(delta);
      case "Right":
        return updateBaseHue(delta * -1);
    }
  });
};
