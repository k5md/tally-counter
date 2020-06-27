import React from 'react';
import { StyleSheet } from 'react-native';
import { Modal as RNPModal, Portal } from 'react-native-paper';

const styles = StyleSheet.create({
  container: {
    left: '5%',
    right: '5%',
    height: '80%',
    width: '90%',
    display: 'flex',
    backgroundColor: 'white',
    position: 'absolute',
  },
});

const Modal = ({ visible, onDismiss, children }) => (
  <Portal>
    <RNPModal visible={visible} onDismiss={onDismiss} contentContainerStyle={styles.container}>
      {children}
    </RNPModal>
  </Portal>
);

export default Modal;
