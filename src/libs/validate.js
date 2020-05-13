export const fToC = (fahrenheit) => {
  var fTemp = fahrenheit;
  var fToCel = ((fTemp - 32) * 5) / 9;
  return fToCel.toFixed(1);
};

export const cToF = (celsius) => {
  var cTemp = celsius;
  var cToFahr = (cTemp * 9) / 5 + 32;
  return cToFahr.toFixed(1);
};

export const kToC = (kelvin) => {
  if (kelvin < 0) {
    return 'below absolute zero (0 K)';
  } else {
    return (kelvin - 273.15).toFixed(1);
  }
};
