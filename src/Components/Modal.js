import React from 'react';
import { View, StyleSheet, Modal as RNModal } from 'react-native';
import { Modal as RNPModal, Portal } from 'react-native-paper';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import { Button } from './';
import { color, fontSizes } from '../config/styles';
import metrics from '../config/metrics';

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    alignSelf: 'center',
    zIndex: 1,
    maxHeight: metrics.screenHeight - 4 * metrics.navBarHeight,
    maxWidth: metrics.screenWidth - 2 * metrics.navBarHeight,
  },
  header: {
    top: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    zIndex: 2,
  },
  icon: {
    backgroundColor: color.COLOR_PRIMARY,
    borderRadius: 10,
    height: fontSizes.FONT_SIZE_NORMAL,
    width: fontSizes.FONT_SIZE_NORMAL,
    fontSize: fontSizes.FONT_SIZE_SMALL,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    height: metrics.screenHeight - 2 * metrics.navBarHeight,
    width: metrics.screenWidth - 2 * metrics.navBarHeight,
    paddingTop: 40,
    paddingBottom: 20,
    paddingHorizontal: 20,
    backgroundColor: color.COLOR_SECONDARY,
    zIndex: 1,
    justifyContent: 'center',
  },
  backdrop: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    backgroundColor: 'black',
    opacity: 0.5,
  },
});

const Modal = ({ visible, dismiss, icon, children }) => (
  <Portal>
    <RNModal visible={visible} dismissable={false} transparent>
      <View style={styles.backdrop} />
      <View style={styles.modalContainer}>
        <View style={styles.header}>
          <View style={styles.icon}>
            <Icon name={icon} size={styles.icon.fontSize} color={color.COLOR_SECONDARY} />
          </View>
          <View style={styles.action}>
            <Button icon="close" onPress={dismiss} rounded />
          </View>
        </View>
        <View style={styles.content}>{children}</View>
      </View>
    </RNModal>
  </Portal>
);

export default Modal;
