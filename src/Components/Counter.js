import React, { useState } from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import { IconButton, Button, TextInput, Surface } from 'react-native-paper';
import { ColorPicker } from 'react-native-color-picker';
import ImagePicker from 'react-native-image-crop-picker';
import { color } from '../config/styles';

const styles = StyleSheet.create({
  modal: {
    marginHorizontal: 10,
  },
  formIcon: {
    position: 'absolute',
    top: -20,
    left: 20,
    backgroundColor: color.COLOR_PRIMARY,
    borderRadius: 10,
    zIndex: 2,
  },
  formContent: {
    backgroundColor: color.COLOR_SECONDARY,
    padding: 10,
  },
  formLoadables: {
    flexDirection: 'row',
  },
  formLoadable: {
    flex: 1,
    borderWidth: 1,
  },
  formLoadableControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  formActions: {
    flexDirection: 'row',
  },
});

const Counter = ({ entry, increment, decrement, remove, update }) => {
  if (!entry) {
    return null;
  }
  console.log(entry);
  const { id, title, value, step, colorString, imageString } = entry;

  const imagePickerHandler = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: false,
      mediaType: 'photo',
    })
      .then(image => {
        const imageString = {
          uri: image.path,
          width: image.width,
          height: image.height,
          mime: image.mime,
        };

        update(id, { imageString });
      })
      .catch(e => console.log(e));
  };

  console.log(imageString);

  return (
    <View style={styles.modal}>
      <View style={styles.formIcon}>
        <IconButton icon="counter" color={color.COLOR_SECONDARY} />
      </View>
      <View style={styles.formContent}>
        <TextInput
          label="Title"
          mode="outlined"
          value={title}
          onChangeText={v => update(id, { title: v })}
        />
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
        <View style={styles.formLoadables}>
          <View style={styles.formLoadable}>
            <ColorPicker
              onColorSelected={v => update(id, { colorString: v })}
              style={{ flex: 1 }}
              hideSliders
              defaultColor={colorString}
            />
          </View>
          <View style={styles.formLoadable}>
            {imageString && (
              <Image
                style={{ width: 300, height: 300, resizeMode: 'stretch' }}
                source={imageString}
              />
            )}
            <View style={styles.formLoadableControls}>
              {imageString && (
                <IconButton onPress={() => update(id, { imageString: null })} icon="delete" />
              )}
              <IconButton onPress={imagePickerHandler} icon="plus" />
            </View>
          </View>
        </View>

        <View style={styles.formActions}>
          <IconButton icon="delete" onPress={() => remove(id)} />
          <Button>Apply</Button>
        </View>
      </View>
    </View>
  );
};

export default Counter;
