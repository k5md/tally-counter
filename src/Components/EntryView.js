import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { IconButton, Colors } from 'react-native-paper';

const styles = StyleSheet.create({});

export const EntryView = ({
  entry,
  style,
  increment,
  decrement,
}) => {
  const { id, title, colorString, value } = entry;
  console.log('ID in entryview', entry);

  return (
    <View style={[style, { backgroundColor: colorString }]}>
      <Text style={{ color: 'white', fontSize: 14 }}>{title}</Text>

      <View style={{ display: 'flex', flexDirection: 'row'}}>
        <IconButton
          icon="minus"
          color={Colors.black}
          size={20}
          onPress={() => decrement(id)}
        />
        <Text>{value}</Text>
        <IconButton
          icon="plus"
          color={Colors.black}
          size={20}
          onPress={() => increment(id)}
        />
      </View>
    </View>
  );
};
