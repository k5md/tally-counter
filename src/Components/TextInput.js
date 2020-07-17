import React from 'react';
import { View, StyleSheet, TextInput as TextInputRN } from 'react-native';
import { Text } from 'react-native-paper';
import { color, fontSizes } from '../config/styles';
import { LabeledView } from './';

const styles = StyleSheet.create({
  textInput: {
    fontSize: fontSizes.FONT_SIZE_SMALL,
  },
});

const TextInput = ({
  label,
  value,
  onChange,
  keyboardType = 'default',
  backgroundColor = color.COLOR_SECONDARY,
  textInputStyle = {},
  labelStyle = {},
}) => (
  <LabeledView label={label} backgroundColor={backgroundColor} labelStyle={labelStyle}>
    <TextInputRN value={value} onChangeText={onChange} keyboardType={keyboardType} style={[styles.textInput, textInputStyle]}/>
  </LabeledView>
);

export default TextInput;
