import React from 'react';
import { View, StyleSheet } from 'react-native';
import { IconButton, Colors, TextInput } from 'react-native-paper';
import { ColorPicker } from 'react-native-color-picker';
import ImagePicker from 'react-native-image-crop-picker';

const styles = StyleSheet.create({});

export const Counter = ({
  entry,
  increment,
  decrement,
  remove,
  update,
}) => {
  if (!entry) return null;
  const { id, title, value, step, colorString, imageString } = entry;


  const imagePickerHandler = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: false,
    }).then(image => {
      console.log(image);
    });
  };

  return (
    <View style={{}}>
      <TextInput
        label="Title"
        value={title}
        onChangeText={v => update(id, { title: v })}
      />
      <IconButton icon="minus" size={20} onPress={() => decrement(id)} />
      <IconButton icon="plus" size={20} onPress={() => increment(id)} />
      <IconButton icon="delete" size={20} onPress={() => remove(id)} />
      <TextInput
        label="Step"
        value={step}
        onChangeText={v => update(id, { step: Number(v) })}
      />
      <TextInput
        label="Value"
        value={value}
        onChangeText={v => update(id, { value: Number(v) })}
      />
      {/*<ColorPicker
        onColorSelected={v => update(id, { color: v })}
        style={{ flex: 0 }}
        hideSliders
        color={colorString}
      />*/}
      <IconButton onPress={imagePickerHandler} icon="plus" />
    </View>
  );
};
