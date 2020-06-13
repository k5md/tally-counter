import React, { useState } from 'react';
import { Modal, Portal, Text, Button, Provider } from 'react-native-paper';

export const ModalView = ({ visible, onClose, children }) => (
    <Portal>
      <Modal visible={visible} onDismiss={onClose}>
        {children}
      </Modal>
    </Portal>
);
