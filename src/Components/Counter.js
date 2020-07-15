import React, { useState } from 'react';
import { View, StyleSheet, Image, Button, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import { ColorPicker } from 'react-native-color-picker';
import ImagePicker from 'react-native-image-crop-picker';
import { color, fontSizes } from '../config/styles';
import metrics from '../config/metrics';

const styles = StyleSheet.create({
  modal: {
    marginHorizontal: 10,
  },
  formActionsContainer: {
    position: 'absolute',
    top: -20,
    right: 20,
    left: 20,
    zIndex: 2,
  },
  formActions: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  formAction: {
    backgroundColor: color.COLOR_PRIMARY,
    borderRadius: 10,
    height: fontSizes.FONT_SIZE_NORMAL,
    width: fontSizes.FONT_SIZE_NORMAL,
    fontSize: fontSizes.FONT_SIZE_SMALL,
  },
  formContent: {
    backgroundColor: color.COLOR_SECONDARY,
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  formLoadables: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  formLoadable: {
    height: metrics.blockHeightGrid,
    width: metrics.blockWidthGrid,
    marginVertical: 20,
    borderWidth: 1,
  },
  formLoadableImage: {
    height: metrics.blockHeightGrid,
    width: metrics.blockWidthGrid,
    resizeMode: 'stretch',
  },
  formLoadableControls: {
    position: 'absolute',
    height: metrics.blockHeightGrid,
    width: metrics.blockWidthGrid,
    top: 0,
    left: 0,
    flex: 1,
    flexDirection: 'row',
  },
  formLoadableControl: {
    width: metrics.blockWidthGrid,
    height: '100%',
    backgroundColor: 'grey',
    opacity: 0.5,
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
    <View style={styles.modal}>
      <View style={styles.formActionsContainer}>
        <View style={styles.formActions}>
          <View style={styles.formAction}>
            <Icon name="counter" size={styles.formAction.fontSize} color={color.COLOR_SECONDARY} />
          </View>
          <View style={styles.formAction}>
            <Icon color={color.COLOR_SECONDARY} name="delete" onPress={() => remove(id)} />
          </View>
        </View>
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
            {imageString && <Image style={styles.formLoadableImage} source={imageString} />}
            <View style={styles.formLoadableControls}>
              {imageString ? (
                <TouchableOpacity
                  contentStyle={styles.formLoadableControl}
                  onPress={() => update(id, { imageString: null })}
                >
                  <Icon name="delete" color={color.COLOR_SECONDARY} />
                </TouchableOpacity>
              ) : (
                <Button
                  color={color.COLOR_SECONDARY}
                  contentStyle={styles.formLoadableControl}
                  onPress={imagePickerHandler}
                  title="Select image"
                />
              )}
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Counter;
