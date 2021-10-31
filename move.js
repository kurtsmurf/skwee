// @ts-check

const move = (acc, { time, amplitude }) =>
  acc + `M ${time}, ${(amplitude + 0.5) * 100} `;
const lineTo = (acc, { time, amplitude }) =>
  acc + `L ${time}, ${(amplitude + 0.5) * 100} `;

export const toPath = (floats) => {
  const [first, ...rest] = floats;
  const startingPoint = move("", { time: 0, amplitude: first })
  const reducer = (path, float, index) =>
    lineTo(path, { time: index, amplitude: float })
  return rest.reduce(reducer, startingPoint)
};
