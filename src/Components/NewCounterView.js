import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput } from 'react-native';
import { IconButton, Colors } from 'react-native-paper';
import ImagePicker from 'react-native-image-picker';

const styles = StyleSheet.create({});

export const NewCounterView = ({ onClose }) => {
  return (
    <View>
      <TextInput label='Title' mode='outlined'/>
      <TextInput label='Step' mode='outlined'/>
      <TextInput label='Value' mode='outlined'/>
      <TextInput label='Title' mode='outlined'/>

    </View>
  );
};
