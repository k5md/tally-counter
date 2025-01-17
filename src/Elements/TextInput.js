import React from 'react';
import { StyleSheet, TextInput as TextInputRN } from 'react-native';
import { LabeledView } from './';
import { color, fontSizes } from '../config/styles';
import { moderateScale } from '../config/metrics';

const styles = StyleSheet.create({
  text: {
    fontSize: fontSizes.FONT_SIZE_SMALL,
    paddingHorizontal: fontSizes.FONT_SIZE_SMALL / 2,
    paddingVertical: moderateScale(8),
  },
});

const TextInput = ({
  label,
  value,
  onChange,
  onEndEditing = () => {},
  keyboardType = 'default',
  backgroundColor = color.COLOR_SECONDARY,
  textStyle = {},
  labelStyle = {},
  ...rest
}) => (
  <LabeledView label={label} backgroundColor={backgroundColor} labelStyle={labelStyle}>
    <TextInputRN
      {...rest}
      value={value}
      onChangeText={onChange}
      onEndEditing={onEndEditing}
      keyboardType={keyboardType}
      style={[styles.text, textStyle]}
    />
  </LabeledView>
);

export default TextInput;
