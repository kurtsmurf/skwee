// @ts-check
const move = (path, { time, amplitude }) => path + `M ${time}, ${amplitude} `;
const lineTo = (path, { time, amplitude }) => path + `L ${time}, ${amplitude} `;
const normalize = (float) => (float + 0.5) * 128;

/**
 * Given an array of 32 bit floating point numbers, produces a string path definition for passing to the 'd' attribute of svg path elements.
 *
 * @param {Float32Array} floats
 * @returns {string}
 */
export const toPath = (floats) => {
  const [first, ...rest] = floats.map(normalize);
  const startingPoint = move("", { time: 0, amplitude: first });
  const reducer = (path, float, index) =>
    lineTo(path, { time: index + 1, amplitude: float });
  return rest.reduce(reducer, startingPoint);
};
