import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Checkbox, Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import { color, fontSizes } from '../config/styles';
import metrics from '../config/metrics';
import { LabeledView, Button } from './';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formContent: {
    height: '100%',
    alignContent: 'stretch',
    paddingTop: 20,
    paddingHorizontal: 20,
    zIndex: 2,
  },
  filter: {
    flex: 0.5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  selectableText: {
    fontSize: fontSizes.FONT_SIZE_SMALL,
    color: color.COLOR_TERTIARY,
    textAlign: 'center',
  },
});

const StatisticsFilters = ({ selectables, onSelect }) => (
  <LabeledView label="Select items to show" style={styles.formContent}>
    <FlatList
      data={selectables}
      renderItem={({ item: { id, title, selected } }) => (
        <View style={styles.filter}>
          <View style={styles.container}>
            <Text ellipsizeMode="head" numberOfLines={1} style={styles.selectableText}>
              {title}
            </Text>
          </View>
          <View style={styles.container}>
            <Checkbox
              status={selected ? 'checked' : 'unchecked'}
              onPress={() => onSelect(id, !selected)}
            />
          </View>
        </View>
      )}
      keyExtractor={({ id }) => String(id)}
      numColumns={2}
      removeClippedSubviews={false}
      overScrollMode="never"
    />
  </LabeledView>
);

export default StatisticsFilters;
