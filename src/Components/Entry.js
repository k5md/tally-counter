import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { IconButton, Colors } from 'react-native-paper';
import { CounterContainer } from '../Containers';
import { Modal } from './';

const styles = StyleSheet.create({});

export const Entry = props => {
  // console.log('entry rerender', props);
  const { entry, style, increment, decrement } = props;
  const { id, title, value, step, colorString } = entry;

  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <View style={[style, { backgroundColor: colorString }]}>
        <Text style={{ color: 'white', fontSize: 14 }}>{title}</Text>
        <View style={{ display: 'flex', flexDirection: 'row' }}>
          <IconButton icon="minus" color={Colors.black} size={20} onPress={() => decrement(id)} />
          <Text>{value}</Text>
          <IconButton icon="plus" color={Colors.black} size={20} onPress={() => increment(id)} />

          <IconButton
            icon="dots-vertical"
            color={Colors.black}
            size={20}
            onPress={() => setModalVisible(true)}
          />
        </View>
      </View>
      <Modal visible={modalVisible} onClose={() => setModalVisible(false)}>
        <CounterContainer id={id} />
      </Modal>
    </>
  );
};
