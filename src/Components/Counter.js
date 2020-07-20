import React, { useState, useCallback } from 'react';
import { View, StyleSheet, Image, ScrollView } from 'react-native';
import { ColorPicker } from 'react-native-color-picker';
import ImagePicker from 'react-native-image-crop-picker';
import { color, fontSizes } from '../config/styles';
import metrics from '../config/metrics';
import { Button, TextInput, LabeledView } from './';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  counter: {

  },
  actions: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  loadables: {
    /*flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',*/
    //paddingVertical: 20,
  },
  loadable: {
    flex: 0,
    height: metrics.blockHeightGrid,
    width: '100%',
    justifyContent: 'center',
    marginVertical: 20,
  },
  image: {
    flex: 1,
    alignSelf: 'center',
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
    alignSelf: 'center',
    zIndex: 2,
  },
  add: {
    backgroundColor: color.COLOR_SECONDARY,
  },
  delete: {
    
  },
  loadableControlText: {
    fontSize: fontSizes.FONT_SIZE_SMALL,
  },
  deleteConfirmed: {
    backgroundColor: color.COLOR_TERTIARY,
  },
});

const Counter = ({ entry, remove, update }) => {
  const [deleteConfirmed, setDeleteConfirmed] = useState(false);

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
    <View style={styles.counter}>
      <ScrollView>
        <TextInput label="Title" value={title} onChange={v => update(id, { title: v })} />
        <TextInput
          label="Step"
          value={String(step)}
          onChange={v => update(id, { step: Number(v) })}
          keyboardType="numeric"
        />
        <TextInput
          label="Value"
          value={String(value)}
          onChange={v => update(id, { value: Number(v) })}
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
              <Button
                icon="delete"
                style={[styles.loadableControl, styles.delete]}
                onPress={() => update(id, { imageString: null })}
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
