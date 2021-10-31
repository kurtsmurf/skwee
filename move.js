const move = (acc, { time, amplitude }) => acc + `M ${time}, ${(amplitude + 0.5) * 100} `;
const lineTo = (acc, { time, amplitude }) => acc + `L ${time}, ${(amplitude + 0.5) * 100} `;
export const toPath = (floats) => {
  const [first, ...rest] = floats;

  let path = move("", { time: 0, amplitude: first });

  rest.forEach((float, index) => {
    path = lineTo(path, { time: index, amplitude: float });
  });

  return path;
};
