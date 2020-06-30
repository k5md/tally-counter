import React from 'react';
import { Modal as RNPModal, Portal } from 'react-native-paper';

const Modal = ({ visible, onDismiss, children }) => (
  <Portal>
    <RNPModal visible={visible} onDismiss={onDismiss}>
      {children}
    </RNPModal>
  </Portal>
);

export default Modal;
