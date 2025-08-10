import React, { useCallback, useMemo, useState } from 'react';
import { View, StyleSheet, Image, ScrollView } from 'react-native';
import ColorPicker from 'react-native-wheel-color-picker'
import ImagePicker from 'react-native-image-crop-picker';
import { color, fontSizes } from '../../config/styles';
import { blockHeightGrid, screenWidth, blockWidthGrid, navBarHeight } from '../../config/metrics';
import { Button, TextInput, LabeledView } from '../../Elements';
import { translate } from '../../localizations';
import { fromHsv } from '../../utils';

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
    paddingTop: 40,
    paddingBottom: 10,
  },
  actions: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
    marginBottom: 0,
  },
  action: {
    width: navBarHeight * 1.5,
    height: navBarHeight,
    marginHorizontal: 10,
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
    width: screenWidth / 2.5,
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

const Counter = ({
  fields: {
    value,
    setValue,
    step,
    setStep,
    title,
    setTitle,
    colorString,
    setColorString,
    imageString,
    setImageString,
  },
  remove,
  submit,
}) => {
  const [deleteConfirmed, setDeleteConfirmed] = useState(false);

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
        <TextInput label={translate('Title')} value={title} onChange={setTitle} />
        <TextInput label={translate('Step')} value={step} onChange={setStep} keyboardType="numeric" />
        <View style={styles.row}>
          <View style={styles.container}>
            <TextInput label={translate('Value')} value={value} onChange={setValue} keyboardType="numeric" />
          </View>
        </View>

        <View style={styles.loadables}>
          <LabeledView label={translate('Color')} style={[styles.loadable, styles.loadableColor ]}>
            <ColorPicker
                onColorChangeComplete={setColorString}
                swatches={false}
                sliderHidden={true}
                color={colorString}
                useNativeDriver={true}
            />
          </LabeledView>
          <LabeledView label={translate('Image')} style={[styles.loadable, styles.loadableImage]}>
            {imageString ? (
              <>
                <Image style={styles.image} source={imageString} />
                <Button
                  icon="delete"
                  style={[styles.loadableControl, styles.delete]}
                  onPress={() => setImageString(null)}
                  transparent
                />
              </>
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
          onPress={deleteConfirmed ? () => remove() : () => setDeleteConfirmed(true)}
          rounded
          style={[styles.action, deleteConfirmed && styles.deleteConfirmed]}
        />
        <Button icon="content-save" onPress={submit} rounded style={styles.action} />
      </View>
    </View>
  );
};

export default Counter;
