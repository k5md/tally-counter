import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { color, fontSizes } from '../config/styles';

const styles = StyleSheet.create({
  container: {
    flex: 0,
    borderWidth: 1,
    borderRadius: 10,
    margin: fontSizes.FONT_SIZE_SMALL / 2,
  },
  label: {
    position: 'absolute',
    top: -fontSizes.FONT_SIZE_SMALL / 1.2,
    left: fontSizes.FONT_SIZE_SMALL / 2,
    paddingHorizontal: fontSizes.FONT_SIZE_SMALL / 2,
  },
  labelText: {
    fontSize: fontSizes.FONT_SIZE_SMALL,
    color: color.COLOR_TERTIARY,
    textAlign: 'center',
  },
});

const LabeledView = ({ label, backgroundColor = color.COLOR_SECONDARY, children, style, labelStyle = {} }) => (
  <View style={[styles.container, { backgroundColor }]}>
    <View style={[styles.label, { backgroundColor }]}>
      <Text style={[styles.labelText, labelStyle]}>{label}</Text>
    </View>
    <View style={style}>{children}</View>
  </View>
);

export default LabeledView;
