import { useState } from 'react';

export const useQRCustomization = () => {
  const [dotsColor, setDotsColor] = useState('#1a1a2e');
  const [dotsType, setDotsType] = useState('rounded');

  const [cornersSquareColor, setCornersSquareColor] = useState('#1a1a2e');
  const [cornersSquareType, setCornersSquareType] = useState('extra-rounded');

  const [cornersDotColor, setCornersDotColor] = useState('#1a1a2e');
  const [cornersDotType, setCornersDotType] = useState('dot');

  return {
    dotsColor, setDotsColor,
    dotsType, setDotsType,
    cornersSquareColor, setCornersSquareColor,
    cornersSquareType, setCornersSquareType,
    cornersDotColor, setCornersDotColor,
    cornersDotType, setCornersDotType,
  };
};