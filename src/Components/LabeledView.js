import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { color, fontSizes } from '../config/styles';

const styles = StyleSheet.create({
  container: {
    flex: 0,
    borderWidth: 1,
    borderRadius: 10,
    margin: 5,
  },
  label: {
    position: 'absolute',
    top: -10,
    left: 10,
    paddingHorizontal: 5,
  },
});

const LabeledView = ({ label, backgroundColor = color.COLOR_SECONDARY, children, style }) => (
  <View style={[styles.container, { backgroundColor }]}>
    <View style={[styles.label, { backgroundColor }]}>
      <Text>{label}</Text>
    </View>
    <View style={style}>{children}</View>
  </View>
);

export default LabeledView;
