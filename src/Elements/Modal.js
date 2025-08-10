import React from 'react';
import { View, StyleSheet, Modal as RNModal } from 'react-native';
import { MaterialDesignIcons as Icon } from '@react-native-vector-icons/material-design-icons';
import { Button } from './';
import { color, fontSizes } from '../config/styles';
import { screenHeight, navBarHeight, screenWidth } from '../config/metrics';

const styles = StyleSheet.create({
  modalContainer: {
    flex: 0,
    alignSelf: 'center',
    justifyContent: 'center',
    height: screenHeight - 2 * navBarHeight,
    width: screenWidth - navBarHeight,
    zIndex: 1,
  },
  header: {
    top: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    zIndex: 2,
    backgroundColor: 'transparent',
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
    backgroundColor: color.COLOR_SECONDARY,
    zIndex: 1,
    justifyContent: 'center',
    borderRadius: 10,
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
);

export default Modal;
