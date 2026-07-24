export const qrStyleOptions = {
  type: 'svg',
};

export const buildQROptions = (customization) => ({
  ...qrStyleOptions,
  width: customization.size,
  height: customization.size,
  margin: customization.margin,
  dotsOptions: {
    color: customization.dotsColor,
    type: customization.dotsType,
  },
  backgroundOptions: {
    color: customization.backgroundColor,
  },
  cornersSquareOptions: {
    color: customization.cornersSquareColor,
    type: customization.cornersSquareType,
  },
  cornersDotOptions: {
    color: customization.cornersDotColor,
    type: customization.cornersDotType,
  },
});