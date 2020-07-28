import React, { useState, useCallback } from 'react';
import { View, StyleSheet, Image, ScrollView } from 'react-native';
import { ColorPicker, toHsv, fromHsv } from 'react-native-color-picker';
import ImagePicker from 'react-native-image-crop-picker';
import { color, fontSizes } from '../../config/styles';
import {
  blockHeightGrid,
  screenWidth,
  blockWidthGrid,
  blockHeightList,
} from '../../config/metrics';
import { Button, TextInput, LabeledView } from '../../Elements';
import { translate } from '../../localizations';
import {} from 'react-native-color-picker';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  counter: {
    flex: 0,
    paddingHorizontal: 5,
    paddingTop: 50,
    paddingBottom: 20,
  },
  actions: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginRight: 20,
  },
  action: {
    marginLeft: 40,
  },
  loadables: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    minHeight: 2 * blockHeightGrid,
  },
  loadable: {
    flex: 1,
    height: blockHeightGrid,
    justifyContent: 'center',
    padding: 5,
    paddingTop: 20,
  },
  loadableColor: {
    padding: 0,
    minWidth: screenWidth / 3,
    height: 2 * blockHeightGrid,
  },
  loadableImage: {
    width: screenWidth / 2.5,
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

const Counter = props => {
  const { entry, remove } = props;

  const [deleteConfirmed, setDeleteConfirmed] = useState(false);

  const [title, setTitle] = useState(entry.title);
  const [value, setValue] = useState(entry.value || 0);
  const [step, setStep] = useState(entry.step || 0);
  const [colorString, setColorString] = useState(toHsv(entry.colorString) || '');

  const [imageString, setImageString] = useState(entry.imageString || null);

  const { id } = entry;

  const update = () => {
    if (title !== entry.title) {
      props.setTitle(id, title);
    }
    if (value !== entry.value) {
      props.setValue(id, value);
    }
    if (step !== entry.step) {
      props.setStep(id, step);
    }
    if (imageString !== entry.imageString) {
      props.setImageString(id, imageString);
    }
    if (fromHsv(colorString) !== entry.colorString) {
      props.setColorString(id, fromHsv(colorString));
    }
  };

  if (!entry) {
    return null;
  }

  const imagePickerHandler = () => {
    ImagePicker.openPicker({
      width: blockWidthGrid,
      height: blockHeightGrid,
      cropping: false,
      mediaType: 'photo',
    })
      .then(({ path, width, height, mime }) => setImageString({ uri: path, width, height, mime }))
      .catch(e => console.log(e));
  };

  return (
    <View style={styles.counter}>
      <ScrollView>
        <TextInput label={translate('Title')} value={title} onChange={v => setTitle(v)} />
        <TextInput
          label={translate('Step')}
          value={String(step)}
          onChange={v => setStep(Number(v) || 0)}
          keyboardType="numeric"
        />
        <View style={styles.row}>
          <View style={styles.container}>
            <TextInput
              label={translate('Value')}
              value={String(value)}
              onChange={v => setValue(Number(v) || 0)}
              keyboardType="numeric"
            />
          </View>
        </View>

        <View style={styles.loadables}>
          <LabeledView label={translate('Color')} style={[styles.loadable, styles.loadableColor]}>
            <ColorPicker
              onColorChange={v => setColorString(v)}
              style={styles.container}
              defaultColor={fromHsv(colorString)}
            />
          </LabeledView>
          <LabeledView label={translate('Image')} style={[styles.loadable, styles.loadableImage]}>
            {imageString && <Image style={styles.image} source={imageString} />}
            {imageString ? (
              <Button
                icon="delete"
                style={[styles.loadableControl, styles.delete]}
                onPress={() => setImageString(null)}
                transparent
              />
            ) : (
              <Button
                icon="plus"
                style={[styles.loadableControl, styles.add]}
                onPress={imagePickerHandler}
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
          style={[styles.action, deleteConfirmed && styles.deleteConfirmed]}
        />
        <Button icon="content-save" onPress={update} rounded style={styles.action} />
      </View>
    </View>
  );
};

export default Counter;
