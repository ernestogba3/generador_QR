export const qrStyleOptions = {
  width: 280,
  height: 280,
  type: 'svg',
  dotsOptions: {
    color: '#1a1a2e',
    type: 'rounded',
  },
  backgroundOptions: {
    color: '#ffffff',
  },
  cornersSquareOptions: {
    type: 'extra-rounded',
  },
  cornersDotOptions: {
    type: 'dot',
  },
};

export const buildQROptions = ({
  dotsColor,
  dotsType,
  cornersSquareColor,
  cornersSquareType,
  cornersDotColor,
  cornersDotType,
}) => ({
  ...qrStyleOptions,
  dotsOptions: {
    ...qrStyleOptions.dotsOptions,
    color: dotsColor,
    type: dotsType,
  },
  cornersSquareOptions: {
    ...qrStyleOptions.cornersSquareOptions,
    color: cornersSquareColor,
    type: cornersSquareType,
  },
  cornersDotOptions: {
    ...qrStyleOptions.cornersDotOptions,
    color: cornersDotColor,
    type: cornersDotType,
  },
});