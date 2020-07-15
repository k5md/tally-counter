import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Button, ScrollView, TouchableOpacity } from 'react-native';
import { FAB, Checkbox, Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import { StatisticsTable, Modal, StatisticsFilters } from './';

import { color } from '../config/styles';
import metrics from '../config/metrics';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: color.COLOR_SECONDARY,
  },
  control: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingVertical: 10,
  },
  table: {
    flex: 10,
    marginBottom: metrics.navBarHeight,
  },
  button: {
    flex: 1,
    backgroundColor: color.COLOR_PRIMARY,
    borderRadius: 10,
    textAlignVertical: 'center',
    textAlign: 'center',
  },
  buttonActive: {
    backgroundColor: color.COLOR_TERTIARY,
  },
  fabContainer: {
    display: 'flex',
    flexDirection: 'row',
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
  fab: {
    margin: 10,
    backgroundColor: color.COLOR_PRIMARY,
    borderRadius: 10,
  },
});


const Statistics = ({ read, stats, counters, selectableIds, selectableFrames, selectId, selectFrame }) => {
  useEffect(() => {
    const selectedIds = selectableIds.filter(({ selected }) => selected);
    const selectedFrame = selectableFrames.find(({ selected }) => selected);
    if (!selectableIds.length && !selectedIds.length) {
      return;
    }
    read(selectedIds, selectedFrame);
  }, [read, selectableIds, selectableFrames]);

  const formattedStats = stats.map(({ id, value, date }) => {
    const dateObject = new Date(date);
    return {
      value,
      title: counters[id].title,
      milliseconds: dateObject.getTime(),
      date: dateObject.toLocaleDateString(),
      time: dateObject.toLocaleTimeString(),
    };
  });

  const [modalVisible, setModalVisible] = useState(false);

  console.log(selectableFrames);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.controls}>
          <View style={styles.control}>
            {selectableFrames.map(({ id, title, selected }) => (
              <TouchableOpacity
                onPress={() => selectFrame(id)}
                key={id}
                style={[styles.button, selected && styles.buttonActive]}
              >
                <Text>{title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <StatisticsTable style={styles.table} data={formattedStats} />

        <View style={styles.fabContainer}>
          {selectableIds.length ? (<FAB style={styles.fab} icon="filter" onPress={() => setModalVisible(true)} />) : null}
        </View>
      </View>
      <Modal visible={modalVisible} onDismiss={() => setModalVisible(false)}>
        <StatisticsFilters selectables={selectableIds} onSelect={selectId} />
      </Modal>
    </>
  );
};

export default Statistics;
