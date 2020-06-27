export const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

export const randomRGB = () => {
  const r = randomInt(160, 240);
  const g = randomInt(160, 240);
  const b = randomInt(160, 240);
  return `rgb(${r},${g},${b})`;
};

export const cloneDate = date => new Date(date.valueOf());
export const getPrevYear = (date, dt = 1) => cloneDate(date).setFullYear(date.getFullYear() - dt);
export const getPrevMonth = (date, dt = 1) => cloneDate(date).setMonth(date.getMonth() - dt);
export const getPrevDay = (date, dt = 1) => cloneDate(date).setDate(date.getDate() - dt);
