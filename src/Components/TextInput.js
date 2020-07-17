import React from 'react';
import { View, StyleSheet, TextInput as TextInputRN } from 'react-native';
import { Text } from 'react-native-paper';
import { color, fontSizes } from '../config/styles';
import { LabeledView } from './';

const styles = StyleSheet.create({});

const TextInput = ({
  label,
  value,
  onChange,
  keyboardType = 'default',
  backgroundColor = color.COLOR_SECONDARY,
}) => (
  <LabeledView label={label} backgroundColor={backgroundColor}>
    <TextInputRN value={value} onChangeText={onChange} keyboardType={keyboardType} />
  </LabeledView>
);

export default TextInput;
