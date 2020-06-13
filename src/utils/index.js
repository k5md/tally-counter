export const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

export const randomRGB = () => {
  const r = randomInt(160, 240);
  const g = randomInt(160, 240);
  const b = randomInt(160, 240);
  return `rgb(${r},${g},${b})`;
};
