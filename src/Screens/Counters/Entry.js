import React, { useState } from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import CounterContainer from './CounterContainer';
import { Modal, Button } from '../../Elements';
import { color, fontSizes, fonts } from '../../config/styles';
import { moderateScale } from '../../config/metrics';

const styles = StyleSheet.create({
  header: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    zIndex: 2,
    color: color.COLOR_TERTIARY,
  },
  entry: {
    margin: 10,
    shadowColor: color.COLOR_BLACK,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 3,
    flex: 1,
    alignItems: 'stretch',
  },
  title: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    flex: 1,
    fontSize: fontSizes.FONT_SIZE_SMALL,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: color.COLOR_TERTIARY,
  },
  controls: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  controlsText: {
    flex: 1,
    fontSize: fontSizes.FONT_SIZE_SMALL,
    color: color.COLOR_TERTIARY,
    textAlign: 'center',
    textAlignVertical: 'center',
    paddingHorizontal: 10,
  },
  control: {
    flex: 0,
  },
  counterValue: {
    flex: 1,
  },
  image: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    resizeMode: 'stretch',
    opacity: 0.6,
  },
});

const Entry = props => {
  const { entry, style, increment, decrement } = props;
  const { id, title, value, step, colorString, imageString } = entry;

  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <View style={[styles.entry, !imageString && { backgroundColor: colorString }]}>
        {imageString ? <Image style={styles.image} source={imageString} /> : null}
        <View style={styles.header}>
          <Button
            icon="dots-vertical"
            iconColor={styles.header.color}
            onPress={() => setModalVisible(true)}
            transparent
          />
        </View>
        <View style={styles.title}>
          <View style={{flex: 0.1}}/>
          <Text ellipsizeMode="middle" numberOfLines={1} style={styles.titleText}>
            {title}
          </Text>
          <View style={{flex: 0.1}}/>
        </View>
        <View style={styles.controls}>
          <View style={styles.control}>
            <Button
              icon="minus"
              iconColor={styles.controlsText.color}
              onPress={() => decrement(id, value, step)}
              transparent
            />
          </View>
          <View style={styles.counterValue}>
            <Text ellipsizeMode="head" numberOfLines={1} style={styles.controlsText}>
              {value}
            </Text>
          </View>
          <View style={styles.control}>
            <Button
              icon="plus"
              iconColor={styles.controlsText.color}
              onPress={() => increment(id, value, step)}
              transparent
            />
          </View>
        </View>
      </View>
      <Modal visible={modalVisible} dismiss={() => setModalVisible(false)} icon="counter">
        <CounterContainer id={id} />
      </Modal>
    </>
  );
};

export default Entry;
