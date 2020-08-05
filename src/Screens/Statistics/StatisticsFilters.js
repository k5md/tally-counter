import React from 'react';
import { View, StyleSheet, FlatList, Text } from 'react-native';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import { color, fontSizes } from '../../config/styles';
import { translate } from '../../localizations';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formContent: {
    height: '90%',
    alignContent: 'stretch',
    padding: 20,
    paddingTop: 40,
    zIndex: 2,
  },
  filter: {
    flex: 0.5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    flex: 1,
    paddingVertical: 5,
  },
  selectableText: {
    fontSize: fontSizes.FONT_SIZE_BASE,
    color: color.COLOR_TERTIARY,
    textAlign: 'center',
  },
  header: {
    paddingBottom: 10,
  },
  headerText: {
    fontSize: fontSizes.FONT_SIZE_SMALL,
    color: color.COLOR_TERTIARY,
    textAlign: 'center',
  },
  checkbox: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
  },
});

const StatisticsFilters = ({ selectables, onSelect }) => (
  <View style={styles.formContent}>
    <View style={styles.header}>
      <Text style={styles.headerText}>{translate('Select items to show')}</Text>
    </View>
    <FlatList
      data={selectables}
      renderItem={({ item: { id, title, selected } }) => (
        <View style={styles.filter}>
          <View style={styles.text}>
            <Text ellipsizeMode="head" numberOfLines={1} style={styles.selectableText}>
              {title}
            </Text>
          </View>
          <View style={styles.checkbox}>
            <Icon
              size={styles.selectableText.fontSize}
              name={selected ? 'checkbox-marked' : 'checkbox-blank-outline'}
              color={color.COLOR_PRIMARY}
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
  </View>
);

export default StatisticsFilters;
