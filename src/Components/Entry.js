import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Surface, Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import { CounterContainer } from '../Containers';
import { Modal } from './';
import { color, fontSizes, fonts } from '../config/styles';

const styles = StyleSheet.create({
  header: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    fontSize: fontSizes.FONT_SIZE_SMALL,
    zIndex: 2,
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
  },
  entryTitle: {
    fontFamily: fonts.FONT_MEDIUM,
    fontSize: fontSizes.FONT_SIZE_MINI,
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
  countersValue: {
    flex: 1,
  },
});

const Entry = props => {
  const { entry, style, increment, decrement } = props;
  const { id, title, value, step, colorString } = entry;

  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <Surface style={[style, styles.entry, { backgroundColor: colorString }]}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Icon
              size={styles.header.fontSize}
              color={styles.counterControlsText.color}
              name="dots-vertical"
            />
          </TouchableOpacity>
        </View>

        <View style={styles.title}>
          <Text ellipsizeMode="middle" numberOfLines={1} style={styles.entryTitle}>
            {title}
          </Text>
        </View>

        <View style={styles.counterControls}>
          <View style={style.counterControl}>
            <TouchableOpacity onPress={() => decrement(id, value, step)}>
              <Icon
                size={styles.counterControlsText.fontSize}
                name="minus"
                color={styles.counterControlsText.color}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.countersValue}>
            <Text ellipsizeMode="head" numberOfLines={1} style={styles.counterControlsText}>
              {value}
            </Text>
          </View>
          <View style={style.counterControl}>
            <TouchableOpacity onPress={() => increment(id, value, step)}>
              <Icon
                size={styles.counterControlsText.fontSize}
                color={styles.counterControlsText.color}
                name="plus"
              />
            </TouchableOpacity>
          </View>
        </View>
      </Surface>
      <Modal visible={modalVisible} onDismiss={() => setModalVisible(false)}>
        <CounterContainer id={id} />
      </Modal>
    </>
  );
};

export default Entry;
