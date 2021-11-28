export const updateBaseHue = (delta) => {
  const baseHue = parseFloat(document.body.style.getPropertyValue("--base-hue"));
  const newValue = (baseHue + delta) % 360;
  document.body.style.setProperty("--base-hue", newValue.toString());
};
export const updateSpread = (delta) => {
  const spread = parseFloat(document.body.style.getPropertyValue("--spread"));
  const newValue = (spread + delta) % 720;
  document.body.style.setProperty("--spread", newValue.toString());
};
