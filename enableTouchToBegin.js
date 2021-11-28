import { start } from "./start.js";

// Handle touch dismiss prompt
export const enableTouchToBegin = () => {
  const prompt = document.querySelector("figure");
  prompt.addEventListener("pointerdown", () => {
    start();
    prompt.style.setProperty("display", "none");
  });
};
