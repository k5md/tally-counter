import React from 'react';
import { StyleSheet } from 'react-native';
import { Modal as RNPModal, Portal } from 'react-native-paper';

const styles = StyleSheet.create({
  container: {

    display: 'flex',

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
