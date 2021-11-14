export default () => {
  let dragStartX;
  let baseHue;

  let dragStartY;
  let spread;

  document.body.onpointerup = document.body.onpointerleave = () => {
    dragStartX = undefined;
    dragStartY = undefined;
  }

  document.body.onpointerdown = (e) => {
    dragStartX = e.x;
    baseHue = document.body.style.getPropertyValue("--base-hue");
    baseHue = parseFloat(baseHue);

    dragStartY = e.y;
    spread = parseFloat(document.body.style.getPropertyValue("--spread"));
  };

  document.body.onpointermove = (e) => {
    if (dragStartX) {
      const newBaseHue = baseHue + (e.x - dragStartX) / 5 % 360;
      document.body.style.setProperty("--base-hue", newBaseHue);
    }

    if (dragStartY) {
      const newSpread = ((spread + dragStartY + e.y) % 720) - 360
      document.body.style.setProperty("--spread", newSpread);
    }
  };
};
