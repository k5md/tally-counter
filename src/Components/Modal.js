import React from 'react';
import { StyleSheet } from 'react-native';
import { Modal as RNPModal, Portal } from 'react-native-paper';

const styles = StyleSheet.create({
  modalContainer: {
    left: '5%',
    right: '5%',
    height: '80%',
    width: '90%',
    display: 'flex',
    backgroundColor: 'white',
    position: 'absolute',
  },
});

export const Modal = ({ visible, onClose, children }) => (
  <Portal>
    <RNPModal
      visible={visible}
      onDismiss={onClose}
      contentContainerStyle={styles.modalContainer}
    >
      {children}
    </RNPModal>
  </Portal>
);
