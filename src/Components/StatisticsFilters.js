import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Checkbox, Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import { color, fontSizes } from '../config/styles';
import metrics from '../config/metrics';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modal: {
    marginHorizontal: metrics.navBarHeight,
    maxHeight: metrics.screenHeight - 4 * metrics.navBarHeight,
    maxWidth: metrics.screenWidth - metrics.navBarHeight,
  },
  formActionsContainer: {
    position: 'absolute',
    top: -20,
    right: 20,
    left: 20,
    bottom: 20,
    zIndex: 2,
  },
  formActions: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  formAction: {
    backgroundColor: color.COLOR_PRIMARY,
    borderRadius: 10,
    height: fontSizes.FONT_SIZE_NORMAL,
    width: fontSizes.FONT_SIZE_NORMAL,
    fontSize: fontSizes.FONT_SIZE_SMALL,
  },
  formContent: {
    flex: 0,
    backgroundColor: color.COLOR_SECONDARY,
    paddingVertical: 50,
    paddingHorizontal: 20,
    zIndex: 2,
  },
  filter: {
    flex: 0.5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  filters: {
    flex: 0,
  },
  selectableTitleText: {
    fontSize: fontSizes.FONT_SIZE_SMALL,
    color: color.COLOR_TERTIARY,
    textAlign: 'center',
  },
});

const StatisticsFilters = ({ selectables, onSelect }) => (
  <View style={styles.modal}>
    <View style={styles.formActionsContainer}>
      <View style={styles.formActions}>
        <View style={styles.formAction}>
          <Icon name="counter" color={color.COLOR_SECONDARY} />
        </View>
      </View>
    </View>
    <View style={styles.formContent}>
        <FlatList
          data={selectables}
          renderItem={({ item: { id, title, selected } }) => (
            <View style={styles.filter}>
              <View style={styles.container}>
                <Text ellipsizeMode="head" numberOfLines={1} style={styles.selectableTitleText}>
                  {title}
                </Text>
              </View>
              <View style={styles.container}>
                <Checkbox status={selected ? 'checked' : 'unchecked'} onPress={() => onSelect(id, !selected)} />
              </View>
            </View>
          )}
          keyExtractor={({ id }) => String(id)}
          numColumns={2}
          contentContainerStyle={styles.filters}
          removeClippedSubviews={false}
        />
    </View>
  </View>
);

export default StatisticsFilters;
