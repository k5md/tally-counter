import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Modal, Portal, Text, Button, Provider, Colors } from 'react-native-paper';

const styles = StyleSheet.create({
  modalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 'auto',
    left: '5%',
    right: '5%',
    height: '80%',
    width: '90%',
    display: 'flex',
    backgroundColor: Colors.white,
  },
});

export const ModalView = ({ visible, onClose, children }) => (
    <Portal>
      <Modal visible={visible} onDismiss={onClose} contentContainerStyle={styles.modalContainer}>
        {children}
      </Modal>
    </Portal>
);
