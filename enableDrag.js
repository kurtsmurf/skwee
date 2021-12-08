// @ts-check
import { updateBaseHue, updateSpread } from "./updateCustomProperty.js";

// Handle drag
export const enableDrag = () => {
  /** @type {{x: number, y:number}} */
  let dragStart;
  const drag = (e) => {
    updateBaseHue((e.x - dragStart.x) / 5);
    updateSpread((e.y - dragStart.y) / 5);
    dragStart.x = e.x;
    dragStart.y = e.y;
  };
  const startDrag = (e) => {
    document.body.addEventListener("pointermove", drag);
    dragStart = { x: e.x, y: e.y };
  };
  const stopDrag = () => {
    document.body.removeEventListener("pointermove", drag);
    dragStart = undefined;
  };

  document.body.addEventListener("pointerdown", startDrag);
  document.body.addEventListener("pointerup", stopDrag);
  document.body.addEventListener("pointerleave", stopDrag);
};
