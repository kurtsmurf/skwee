// @ts-check

const move = (path, { time, amplitude }) =>
  path + `M ${time}, ${ amplitude } `;
const lineTo = (path, { time, amplitude }) =>
  path + `L ${time}, ${ amplitude } `;

const normalize = float => (float + 0.5) * 100;

export const toPath = (floats) => {
  const [first, ...rest] = floats.map(normalize);
  const startingPoint = move("", { time: 0, amplitude: first });
  const reducer = (path, float, index) =>
    lineTo(path, { time: index + 1, amplitude: float });
  return rest.reduce(reducer, startingPoint);
};
