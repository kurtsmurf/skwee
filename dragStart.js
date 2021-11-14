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
    baseHue = parseFloat(document.body.style.getPropertyValue("--base-hue"));

    dragStartY = e.y;
    spread = parseFloat(document.body.style.getPropertyValue("--spread"));
  };

  document.body.onpointermove = (e) => {
    if (dragStartX) {
      document.body.style.setProperty(
        "--base-hue",
        baseHue + (e.x - dragStartX) / 5 % 360,
      );
    }

    if (dragStartY) {
      document.body.style.setProperty(
        "--spread",
        baseHue + (e.y - dragStartY) % 180,
      );
    }
  };
};
