import React from 'react';
import { StyleSheet } from 'react-native';
import { Modal as RNPModal, Portal } from 'react-native-paper';
import metrics from '../config/metrics';

const styles = StyleSheet.create({
  modal: {
    marginHorizontal: metrics.navBarHeight,
    maxHeight: metrics.screenHeight - 4 * metrics.navBarHeight,
    maxWidth: metrics.screenWidth - metrics.navBarHeight,
  },
});

const Modal = ({ visible, onDismiss, children }) => (
  <Portal>
    <RNPModal visible={visible} onDismiss={onDismiss}>
      {children}
    </RNPModal>
  </Portal>
);

export default Modal;
