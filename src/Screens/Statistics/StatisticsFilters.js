import React from 'react';
import { View, StyleSheet, FlatList, Text } from 'react-native';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import { color, fontSizes } from '../../config/styles';
import { moderateScale } from '../../config/metrics';
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
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: moderateScale(5),
  },
  text: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectableText: {
    fontSize: fontSizes.FONT_SIZE_BASE,
    color: color.COLOR_TERTIARY,
    marginHorizontal: 10,
  },
  header: {
    paddingBottom: moderateScale(10),
  },
  headerText: {
    fontSize: fontSizes.FONT_SIZE_SMALL,
    color: color.COLOR_TERTIARY,
    textAlign: 'center',
  },
  checkbox: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
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
      removeClippedSubviews={false}
      overScrollMode="never"
    />
  </View>
);

export default StatisticsFilters;
