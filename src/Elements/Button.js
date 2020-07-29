import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import { color as colors, fontSizes } from '../config/styles';

const styles = StyleSheet.create({
  container: {
    height: fontSizes.FONT_SIZE_NORMAL,
    width: fontSizes.FONT_SIZE_NORMAL,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.COLOR_PRIMARY,
    zIndex: 9000,
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

const Button = ({
  icon,
  label,
  onPress,
  style = {}, // touchableOpacity style
  labelStyle = {}, // text style
  iconStyle = {}, // icon style
  iconColor = colors.COLOR_SECONDARY,
  small = false,
  large = false,
  rounded = false,
  transparent = false,
}) => {
  const containerStyle = [
    styles.container,
    rounded ? styles.rounded : {},
    small ? styles.small : {},
    large ? styles.large : {},
    transparent ? styles.transparent : {},
    style,
  ];
  const iconSize = fontSizes.FONT_SIZE_SMALL || (small && fontSizes.FONT_SIZE_BASE) || (large && fontSizes.FONT_SIZE_NORMAL);

  return (
    <TouchableOpacity style={containerStyle} onPress={onPress}>
      {icon ? <Icon color={iconColor} size={iconSize} name={icon} style={iconStyle} /> : null}
      {label ? <Text style={labelStyle}>{label}</Text> : null}
    </TouchableOpacity>
  );
};

export default Button;
