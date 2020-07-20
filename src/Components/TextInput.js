import React from 'react';
import { StyleSheet, TextInput as TextInputRN } from 'react-native';
import { LabeledView } from './';
import { color, fontSizes } from '../config/styles';

const styles = StyleSheet.create({
  text: {
    fontSize: fontSizes.FONT_SIZE_SMALL,
    paddingHorizontal: fontSizes.FONT_SIZE_SMALL / 2,
  },
});

const TextInput = ({
  label,
  value,
  onChange,
  keyboardType = 'default',
  backgroundColor = color.COLOR_SECONDARY,
  textStyle = {},
  labelStyle = {},
}) => (
  <LabeledView label={label} backgroundColor={backgroundColor} labelStyle={labelStyle}>
    <TextInputRN
      value={value}
      onChangeText={onChange}
      keyboardType={keyboardType}
      style={[styles.text, textStyle]}
    />
  </LabeledView>
);

export default TextInput;
