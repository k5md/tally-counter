/*
 * platform/application wide metrics for proper styling
 */
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const screenWidth = width < height ? width : height;
export const screenHeight = width < height ? height : width;
export const navBarHeight = 48;
export const blocksPerRow = 2;
export const blockWidthGrid = screenWidth / 2;
export const blockWidthList = screenWidth;
export const blockHeightGrid = screenHeight / 6;
export const blockHeightList = screenHeight / 6;
