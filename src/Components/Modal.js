import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Modal as RNPModal, Portal } from 'react-native-paper';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import { color, fontSizes } from '../config/styles';
import metrics from '../config/metrics';

const styles = StyleSheet.create({
  modalContainer: {
    margin: metrics.navBarHeight,
    maxHeight: metrics.screenHeight - 4 * metrics.navBarHeight,
    maxWidth: metrics.screenWidth - 2 * metrics.navBarHeight,
  },
  header: {
    position: 'absolute',
    top: -20,
    right: 20,
    left: 20,
    zIndex: 2,
  },
  headerIcon: {
    backgroundColor: color.COLOR_PRIMARY,
    borderRadius: 10,
    height: fontSizes.FONT_SIZE_NORMAL,
    width: fontSizes.FONT_SIZE_NORMAL,
    fontSize: fontSizes.FONT_SIZE_SMALL,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    backgroundColor: color.COLOR_SECONDARY,
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
});

const Modal = ({ visible, onDismiss, children, icon }) => {
  const header = icon ? (
    <View style={styles.header}>
      <View style={styles.headerIcon}>
        <Icon name={icon} size={styles.headerIcon.fontSize} color={color.COLOR_SECONDARY} />
      </View>
    </View>
  ) : null;

  return (
    <Portal>
      <RNPModal visible={visible} onDismiss={onDismiss}>
        <View style={styles.modalContainer}>
          {header}
          <View style={styles.content}>{children}</View>
        </View>
      </RNPModal>
    </Portal>
  );
};

export default Modal;
