import React, { useState, useCallback } from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import { ColorPicker } from 'react-native-color-picker';
import ImagePicker from 'react-native-image-crop-picker';
import { color, fontSizes } from '../config/styles';
import metrics from '../config/metrics';
import { IconButton, TextInput, LabeledView } from './';

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
    justifyContent: 'center',
    paddingTop: 20,
  },
  loadable: {
    height: metrics.blockHeightGrid,
    width: metrics.screenWidth / 3,
    marginVertical: 20,
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
  },
  add: {
    backgroundColor: color.COLOR_SECONDARY,
  },
  delete: {
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
      <TextInput label="Title" value={title} onChangeText={v => update(id, { title: v })} />
      <TextInput
        label="Step"
        value={String(step)}
        onChangeText={v => update(id, { step: Number(v) })}
        keyboardType="numeric"
      />
      <TextInput
        label="Value"
        value={String(value)}
        onChangeText={v => update(id, { value: Number(v) })}
        keyboardType="numeric"
      />
      <View style={styles.loadables}>
        <LabeledView label="Color" style={styles.loadable}>
          <ColorPicker
            onColorSelected={v => update(id, { colorString: v })}
            style={styles.container}
            hideSliders
            defaultColor={colorString}
          />
        </LabeledView>
        <LabeledView label="Image" style={styles.loadable}>
          {imageString && <Image style={styles.image} source={imageString} />}
          {imageString ? (
            <IconButton
              name="delete"
              style={[styles.loadableControl, styles.delete]}
              onPress={() => update(id, { imageString: null })}
              size={styles.loadableControlText.fontSize}
              color={color.COLOR_SECONDARY}
            />
          ) : (
            <IconButton
              name="plus"
              style={[styles.loadableControl, styles.add]}
              onPress={imagePickerHandler}
              size={styles.loadableControlText.fontSize}
              color={color.COLOR_PRIMARY}
            />
          )}
        </LabeledView>
      </View>
    </>
  );
};

export default Counter;
