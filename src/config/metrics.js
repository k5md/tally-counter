/*
 * platform/application wide metrics for proper styling
 */
import { Dimensions, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');

const metrics = {
  screenWidth: width < height ? width : height,
  screenHeight: width < height ? height : width,
  navBarHeight: 48, // Platform.OS === 'ios' ? 54 : 66,

  blocksPerLine: 2,
  blockWidthGrid: width < height ? width / 2 : height / 2,
  blockWidthList: width < height ? width : height,
  blockHeightGrid: width < height ? height / 6 : width / 6,
  blockHeightList: width < height ? height / 6 : width / 6,
};

export default metrics;
