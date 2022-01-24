// @ts-check
import { start } from "./start.js";

// Handle touch dismiss prompt
export const enableStart = () => {
  const prompt = document.querySelector("figure");
  prompt.addEventListener("pointerdown", () => {
    start();
    prompt.style.setProperty("display", "none");
  });
};
