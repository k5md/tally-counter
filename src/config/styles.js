/*
 * Provides universal color configs used in the app.
 * Provides universal fonts used in the app.
 */
import { screenHeight, moderateScale } from './metrics';

const fontSizeBase = moderateScale(16);
const fontSizeMini = fontSizeBase - 4;
const fontSizeSmall = fontSizeBase + 4;
const fontSizeNormal = fontSizeBase + 20;
const fontSizeLarge = fontSizeBase + 54;

export const color = {
  COLOR_PRIMARY: '#3f9adf',
  COLOR_SECONDARY: '#eceff1',
  COLOR_TERTIARY: '#1d4866',
  COLOR_WHITE: '#FFFFFF',
  COLOR_BLACK: '#000000',
  COLOR_BLUE_LIGHT: '#66CCFF',
  COLOR_GREY: 'grey',
  COLOR_GREEN: 'green',
  COLOR_PLACEHOLDER: '#111111',
  COLOR_GREY_WHITE: '#fafafa',
  COLOR_GREYISH: '#ebebeb',
  COLOR_DARK_SEPERATOR: '#d4d4d4',
  COLOR_BLACK_TRANSP: 'rgba(0, 0, 0, 0.7)',
  COLOR_GREY_TRANSP: 'rgba(67, 85, 85, 0.7)',
};

export const fonts = {
  FONT_REGULAR: 'Roboto-Regular',
  FONT_MEDIUM: 'Roboto-Medium',
};

export const fontSizes = {
  FONT_SIZE_MINI: fontSizeMini,
  FONT_SIZE_BASE: fontSizeBase,
  FONT_SIZE_SMALL: fontSizeSmall,
  FONT_SIZE_NORMAL: fontSizeNormal,
  FONT_SIZE_LARGE: fontSizeLarge,
};
