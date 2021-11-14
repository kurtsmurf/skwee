import { start } from "./start.js";

export default () => {
    const svg = document.querySelector("svg");
    svg.addEventListener("click", function clickHandler() {
        start();
        svg.removeEventListener("click", clickHandler);
    });
}