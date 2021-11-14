export default () => {
  let dragStart;
  let baseHue;

  document.body.onpointerup = document.body.onpointerleave = () =>
    dragStart = undefined;

  document.body.onpointerdown = (e) => {
    dragStart = e.x;
    baseHue = parseFloat(document.body.style.getPropertyValue("--base-hue"));
  };

  document.body.onpointermove = (e) => {
    if (!dragStart) return;
    document.body.style.setProperty(
      "--base-hue",
      baseHue + (e.x - dragStart) / 5 % 360,
    );
  };
};
