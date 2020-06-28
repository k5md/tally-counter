import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { IconButton, Colors, Surface, Text } from 'react-native-paper';
import { CounterContainer } from '../Containers';
import { Modal } from './';
import { color, fontSizes, fonts } from '../config/styles';

const styles = StyleSheet.create({
  header: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    fontSize: fontSizes.FONT_SIZE_MINI,
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
  },
  counterControl: {
    flex: 0,
  },
  countersValue: {
    flex: 0,
  },
});

const Entry = props => {
  console.log('entry rerender');
  const { entry, style, increment, decrement } = props;
  const { id, title, value, step, colorString } = entry;

  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <Surface style={[style, styles.entry, { backgroundColor: colorString }]}>
        <View style={styles.header}>
          <IconButton
            size={styles.header.fontSize}
            color={styles.counterControlsText.color}
            icon="dots-vertical"
            onPress={() => setModalVisible(true)}
          />
        </View>

        <View style={styles.title}>
          <Text style={styles.entryTitle}>{title}</Text>
        </View>

        <View style={styles.counterControls}>
          <View style={style.counterControl}>
            <IconButton
              size={styles.counterControlsText.fontSize}
              icon="minus"
              color={styles.counterControlsText.color}
              onPress={() => decrement(id, value, step)}
            />
          </View>
          <View style={styles.countersValue}>
            <Text style={styles.counterControlsText}>{value}</Text>
          </View>
          <View style={style.counterControl}>
            <IconButton
              size={styles.counterControlsText.fontSize}
              color={styles.counterControlsText.color}
              icon="plus"
              onPress={() => increment(id, value, step)}
            />
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
