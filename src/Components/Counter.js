import React, { useState, useCallback } from 'react';
import { View, StyleSheet, Image, ScrollView } from 'react-native';
import { ColorPicker } from 'react-native-color-picker';
import ImagePicker from 'react-native-image-crop-picker';
import { color, fontSizes } from '../config/styles';
import { blockHeightGrid, screenWidth, blockWidthGrid } from '../config/metrics';
import { Button, TextInput, LabeledView } from './';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  counter: {
    paddingHorizontal: 10,
    paddingTop: 40,
    paddingBottom: 20,
  },
  actions: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
    marginRight: 10,
  },
  loadables: {
    flex: 0,
    flexDirection: 'row',
  },
  loadable: {
    flex: 1,
    height: blockHeightGrid,
    width: screenWidth / 2.5,
    justifyContent: 'center',
    padding: 10,
    paddingTop: 15,
  },
  image: {
    flex: 0,
    alignSelf: 'center',
    height: '100%',
    width: '100%',
    resizeMode: 'stretch',
  },
  loadableControl: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    zIndex: 2,
  },
  add: {
    backgroundColor: color.COLOR_SECONDARY,
  },
  loadableControlText: {
    fontSize: fontSizes.FONT_SIZE_LARGE,
  },
  deleteConfirmed: {
    backgroundColor: color.COLOR_TERTIARY,
  },
});

const Counter = ({
  entry,
  remove,
  setTitle,
  setValue,
  setStep,
  setColorString,
  setImageString,
}) => {
  const [deleteConfirmed, setDeleteConfirmed] = useState(false);

  if (!entry) {
    return null;
  }

  const { id, title, value, step, colorString, imageString } = entry;

  const imagePickerHandler = () => {
    ImagePicker.openPicker({
      width: blockWidthGrid,
      height: blockHeightGrid,
      cropping: false,
      mediaType: 'photo',
    })
      .then(({ path, width, height, mime }) =>
        setImageString(id, { uri: path, width, height, mime }),
      )
      .catch(e => console.log(e));
  };

  return (
    <View style={styles.counter}>
      <ScrollView>
        <TextInput label="Title" value={title} onChange={v => setTitle(id, v)} />
        <TextInput
          label="Step"
          value={String(step)}
          onChange={v => setStep(id, Number(v))}
          keyboardType="numeric"
        />
        <TextInput
          label="Value"
          value={String(value)}
          onChange={v => setValue(id, Number(v) || 0)}
          keyboardType="numeric"
        />
        <View style={styles.loadables}>
          <LabeledView label="Color" style={styles.loadable}>
            <ColorPicker
              onColorSelected={v => setColorString(id, v)}
              style={styles.container}
              hideSliders
              defaultColor={colorString}
            />
          </LabeledView>
          <LabeledView label="Image" style={styles.loadable}>
            {imageString && <Image style={styles.image} source={imageString} />}
            {imageString ? (
              <Button
                icon="delete"
                style={[styles.loadableControl, styles.delete]}
                onPress={() => setImageString(id, null)}
                size={styles.loadableControlText.fontSize}
                transparent
              />
            ) : (
              <Button
                icon="plus"
                style={[styles.loadableControl, styles.add]}
                onPress={imagePickerHandler}
                size={styles.loadableControlText.fontSize}
                iconColor={color.COLOR_PRIMARY}
              />
            )}
          </LabeledView>
        </View>
      </ScrollView>

      <View style={styles.actions}>
        <Button
          icon="delete"
          onPress={deleteConfirmed ? () => remove(id) : () => setDeleteConfirmed(true)}
          rounded
          style={deleteConfirmed && styles.deleteConfirmed}
        />
      </View>
    </View>
  );
};

export default Counter;
