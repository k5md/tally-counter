import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { IconButton, Colors, Surface } from 'react-native-paper';
import { CounterContainer } from '../Containers';
import { Modal } from './';

const styles = StyleSheet.create({
  entry: {
    marginTop: 16,
    paddingVertical: 8,
    borderWidth: 4,
    borderColor: "#20232a",
    borderRadius: 6,
    backgroundColor: "#61dafb",
    color: "#20232a",
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold"
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
        <Text style={{ color: 'white', fontSize: 14 }}>{title}</Text>
        <View style={{ display: 'flex', flexDirection: 'row' }}>
          <IconButton icon="minus" onPress={() => decrement(id, value, step)} />
          <Text>{value}</Text>
          <IconButton icon="plus" onPress={() => increment(id, value, step)} />

          <IconButton icon="dots-vertical" onPress={() => setModalVisible(true)} />
        </View>
      </Surface>
      <Modal visible={modalVisible} onClose={() => setModalVisible(false)}>
        <CounterContainer id={id} />
      </Modal>
    </>
  );
};

export default Entry;
