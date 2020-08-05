/*
 * platform/application wide metrics for proper styling
 */
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;

export const scale = size => (width / guidelineBaseWidth) * size;
export const verticalScale = size => (height / guidelineBaseHeight) * size;
export const moderateScale = (size, factor = 0.5) => size + (scale(size) - size) * factor;

export const screenWidth = width < height ? width : height;
export const screenHeight = width < height ? height : width;
export const navBarHeight = 48;

export const blocksPerRow = 2;
export const blockWidthGrid = screenWidth / 2;
export const blockWidthList = screenWidth;
export const blockHeightGrid = screenHeight / 6;
export const blockHeightList = screenHeight / 6;
