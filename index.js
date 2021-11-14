// @ts-check
import initialiseDragControl from "./dragStart.js";
import randomiseHue from "./newFile.js"
import attachClickToStartHandler from "./svg.js"

randomiseHue()

const randomiseSpread = () => {
  document.body.style
      .setProperty("--spread", `${Math.random() * 90}`);
}

randomiseSpread()

initialiseDragControl();
attachClickToStartHandler()

