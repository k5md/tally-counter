import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Surface, Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import { CounterContainer } from '../Containers';
import { Modal, Button } from './';
import { color, fontSizes, fonts } from '../config/styles';
import metrics from '../config/metrics';

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
    marginHorizontal: 10,
  },
  entryTitle: {
    fontFamily: fonts.FONT_MEDIUM,
    fontSize: fontSizes.FONT_SIZE_SMALL,
    textAlign: 'center',
    color: color.COLOR_TERTIARY,
  },
  counterControls: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  counterControlsText: {
    fontSize: fontSizes.FONT_SIZE_SMALL,
    color: color.COLOR_TERTIARY,
    textAlign: 'center',
  },
  counterControl: {
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
      <Surface style={[styles.entry, !imageString && { backgroundColor: colorString }]}>
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
          <Text ellipsizeMode="middle" numberOfLines={1} style={styles.entryTitle}>
            {title}
          </Text>
        </View>
        <View style={styles.counterControls}>
          <View style={style.counterControl}>
            <Button
              icon="minus"
              iconColor={styles.counterControlsText.color}
              onPress={() => decrement(id, value, step)}
              transparent
            />
          </View>
          <View style={styles.counterValue}>
            <Text ellipsizeMode="head" numberOfLines={1} style={styles.counterControlsText}>
              {value}
            </Text>
          </View>
          <View style={style.counterControl}>
            <Button
              icon="plus"
              iconColor={styles.counterControlsText.color}
              onPress={() => increment(id, value, step)}
              transparent
            />
          </View>
        </View>
      </Surface>
      <Modal visible={modalVisible} dismiss={() => setModalVisible(false)} icon="counter">
        <CounterContainer id={id} />
      </Modal>
    </>
  );
};

export default Entry;
