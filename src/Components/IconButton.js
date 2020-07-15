import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import { color as colors, fontSizes } from '../config/styles';

const styles = StyleSheet.create({
  container: {
    height: fontSizes.FONT_SIZE_NORMAL,
    width: fontSizes.FONT_SIZE_NORMAL,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.COLOR_PRIMARY,
  },
  rounded: {
    borderRadius: 10,
  },
  small: {
    height: fontSizes.FONT_SIZE_SMALL,
    width: fontSizes.FONT_SIZE_SMALL,
  },
  large: {
    height: fontSizes.FONT_SIZE_LARGE,
    width: fontSizes.FONT_SIZE_LARGE,
  },
  transparent: {
    backgroundColor: 'transparent',
  },
});

const IconButton = ({
  name,
  onPress,
  style,
  color = colors.COLOR_SECONDARY,
  rounded = false,
  small = false,
  large = false,
  transparent = false,
}) => {
  const buttonStyle = [
    styles.container,
    rounded && styles.rounded,
    small && styles.small,
    large && styles.large,
    transparent && styles.transparent,
    style,
  ];
  const iconSize = fontSizes.FONT_SIZE_SMALL || (small && fontSizes.FONT_SIZE_BASE) || (large && fontSizes.FONT_SIZE_NORMAL);
  return (
    <TouchableOpacity style={buttonStyle} onPress={onPress}>
      <Icon color={color} size={iconSize} name={name} />
    </TouchableOpacity>
  );
};

export default IconButton;
