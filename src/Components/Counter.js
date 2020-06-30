import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { IconButton, Button, TextInput, Surface } from 'react-native-paper';
import { ColorPicker } from 'react-native-color-picker';
import ImagePicker from 'react-native-image-crop-picker';
import { color } from '../config/styles';

const styles = StyleSheet.create({
  headerIcon: {
    position: 'absolute',
    top: -20,
    left: 20,
    backgroundColor: color.COLOR_PRIMARY,
    borderRadius: 10,
    zIndex: 2,
  },
  form: {
    padding: 10,
  },
  container: {
    marginHorizontal: 10,
  },
});

const Counter = ({ entry, increment, decrement, remove, update }) => {
  if (!entry) {
    return null;
  }
  const { id, title, value, step, colorString, imageString } = entry;

  const imagePickerHandler = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: false,
    })
      .then(image => {
        console.log(image);
      })
      .catch();
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerIcon}>
        <IconButton icon="counter" color={color.COLOR_SECONDARY} />
      </View>
      <Surface style={styles.form}>
        <TextInput
          label="Title"
          mode="outlined"
          value={title}
          onChangeText={v => update(id, { title: v })}
        />
        <IconButton icon="minus" onPress={() => decrement(id, value, step)} />
        <IconButton icon="plus" onPress={() => increment(id, value, step)} />
        <IconButton icon="delete" onPress={() => remove(id)} />
        <TextInput
          label="Step"
          mode="outlined"
          value={String(step)}
          onChangeText={v => update(id, { step: Number(v) })}
        />
        <TextInput
          label="Value"
          mode="outlined"
          value={String(value)}
          onChangeText={v => update(id, { value: Number(v) })}
        />
        <ColorPicker
          onColorSelected={v => update(id, { color: v })}
          style={{ flex: 0 }}
          hideSliders
          color={colorString}
        />
        <IconButton onPress={imagePickerHandler} icon="plus" />
        <Button>Apply</Button>
      </Surface>
    </View>
  );
};

export default Counter;
