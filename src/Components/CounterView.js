import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { IconButton, Colors } from 'react-native-paper';

const styles = StyleSheet.create({});

export const CounterView = ({
  id,
  title,
  value,
  step,
  colorString,
  imageString,
  increment,
  decrement,
  setValue,
  setTitle,
  setImage,
  setColor,
  setStep,
}) => {
  return (
    <View style={[{ backgroundColor: colorString }]}>
      <Text style={{ color: 'white', fontSize: 14 }}>{title}</Text>

      <View style={{ display: 'flex', flexDirection: 'row' }}>

      </View>
    </View>
  );
};
