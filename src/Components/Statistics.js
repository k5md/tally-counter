import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Button, ScrollView, TouchableOpacity } from 'react-native';
import { FAB, Checkbox, Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import { StatisticsTable, Modal, StatisticsFilters } from './';

import { color, fontSizes } from '../config/styles';
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
    flex: 0,
    backgroundColor: color.COLOR_PRIMARY,

    paddingHorizontal: 20,
  },
  buttonActive: {
    color: color.COLOR_PRIMARY,
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

  controlsText: {
    fontSize: fontSizes.FONT_SIZE_SMALL,
    color: color.COLOR_TERTIARY,
    textAlign: 'center',
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

  const [modalVisible, setModalVisible] = useState(false);

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
                <Text style={styles.controlsText}>{title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <StatisticsTable style={styles.table} data={stats} />

        <View style={styles.fabContainer}>
          {selectableIds.length ? (<FAB style={styles.fab} icon="filter" onPress={() => setModalVisible(true)} />) : null}
        </View>
      </View>
      <Modal visible={modalVisible} onDismiss={() => setModalVisible(false)} icon="filter">
        <StatisticsFilters selectables={selectableIds} onSelect={selectId} />
      </Modal>
    </>
  );
};

export default Statistics;
