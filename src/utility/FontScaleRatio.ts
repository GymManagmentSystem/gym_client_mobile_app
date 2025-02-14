import { PixelRatio } from 'react-native';

export const getScaleFontSize = (size:number) => {
  const scaleFactor = PixelRatio.getFontScale(); // Adjust for font scaling
  return size / scaleFactor;
};