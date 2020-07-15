import React, { useState } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native';
import { Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import { ColorPicker } from 'react-native-color-picker';
import ImagePicker from 'react-native-image-crop-picker';
import { color, fontSizes } from '../config/styles';
import metrics from '../config/metrics';
import { IconButton } from './';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  actions: {
    position: 'absolute',
    right: 20,
    bottom: -20,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 200,
  },
  loadables: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  loadable: {
    height: metrics.blockHeightGrid,
    width: metrics.screenWidth / 3,
    marginVertical: 20,
    borderWidth: 1,
  },
  image: {
    height: metrics.blockHeightGrid,
    width: metrics.screenWidth / 3,
    resizeMode: 'stretch',
  },
  loadableControl: {
    height: metrics.blockHeightGrid,
    width: metrics.screenWidth / 3,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'grey',
    opacity: 0.5,
  },
  loadableControlText: {
    fontSize: fontSizes.FONT_SIZE_SMALL,
  },
});

const Counter = ({ entry, remove, update }) => {
  if (!entry) {
    return null;
  }
  const { id, title, value, step, colorString, imageString } = entry;

  const imagePickerHandler = () => {
    ImagePicker.openPicker({
      width: metrics.blockWidthGrid,
      height: metrics.blockHeightGrid,
      cropping: false,
      mediaType: 'photo',
    })
      .then(({ path, width, height, mime }) =>
        update(id, { imageString: { uri: path, width, height, mime } }),
      )
      .catch(e => console.log(e));
  };

  return (
    <>
      <TextInput
        label="Title"
        mode="outlined"
        value={title}
        onChangeText={v => update(id, { title: v })}
        keyboardType="numeric"
      />
      <TextInput
        label="Step"
        mode="outlined"
        value={String(step)}
        onChangeText={v => update(id, { step: Number(v) })}
        keyboardType="numeric"
      />
      <TextInput
        label="Value"
        mode="outlined"
        value={String(value)}
        onChangeText={v => update(id, { value: Number(v) })}
        keyboardType="numeric"
      />
      <View style={styles.loadables}>
        <View style={styles.loadable}>
          <ColorPicker
            onColorSelected={v => update(id, { colorString: v })}
            style={styles.container}
            hideSliders
            defaultColor={colorString}
          />
        </View>
        <View style={styles.loadable}>
          {imageString && <Image style={styles.image} source={imageString} />}
          {imageString && (
            <TouchableOpacity
              style={styles.loadableControl}
              onPress={() => update(id, { imageString: null })}
            >
              <Icon name="delete" size={styles.loadableControlText.fontSize} color={color.COLOR_SECONDARY} />
            </TouchableOpacity>
          )}
          {!imageString && (
            <TouchableOpacity style={styles.loadableControl} onPress={imagePickerHandler}>
              <Text style={styles.loadableControlText}>Select image</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
      <View style={styles.actions}>
        <IconButton name="delete" onPress={() => remove(id)} rounded />
        <IconButton name="cancel" onPress={() => update(id)} rounded />
        <IconButton name="check" onPress={() => update(id)} rounded />
      </View>
    </>
  );
};

export default Counter;
