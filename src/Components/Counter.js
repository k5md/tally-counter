import React from 'react';
import { View, StyleSheet } from 'react-native';
import { IconButton, Colors, TextInput } from 'react-native-paper';
import { ColorPicker } from 'react-native-color-picker';
import ImagePicker from 'react-native-image-crop-picker';

const styles = StyleSheet.create({});

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
    <View style={{}}>
      <TextInput label="Title" value={title} onChangeText={v => update(id, { title: v })} />
      <IconButton icon="minus" onPress={() => decrement(id, value, step)} />
      <IconButton icon="plus" onPress={() => increment(id, value, step)} />
      <IconButton icon="delete" onPress={() => remove(id)} />
      <TextInput
        label="Step"
        value={String(step)}
        onChangeText={v => update(id, { step: Number(v) })}
      />
      <TextInput
        label="Value"
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
    </View>
  );
};

export default Counter;
