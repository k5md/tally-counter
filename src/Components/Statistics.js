import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { FAB } from 'react-native-paper';
import { StatisticsTable, Modal, StatisticsFilters, Button } from './';

import { color, fontSizes } from '../config/styles';
import { navBarHeight } from '../config/metrics';

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
    marginBottom: navBarHeight,
  },
  button: {
    width: 'auto',
    height: 'auto',

    paddingHorizontal: 20,
    paddingVertical: 10,
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

  controlsText: {
    color: color.COLOR_TERTIARY,
    fontSize: fontSizes.FONT_SIZE_SMALL,
  },
  controlsTextActive: {
    color: color.COLOR_SECONDARY,
  },
});

const Statistics = ({
  read,
  stats,
  counters,
  selectableIds,
  selectableFrames,
  selectId,
  selectFrame,
}) => {
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
              <Button
                label={title}
                labelStyle={[styles.controlsText, selected && styles.controlsTextActive]}
                onPress={() => selectFrame(id)}
                key={id}
                style={[styles.button, selected && styles.buttonActive]}
                rounded
              />
            ))}
          </View>
        </View>

        <StatisticsTable style={styles.table} data={stats} />

        <View style={styles.fabContainer}>
          {selectableIds.length ? (
            <FAB style={styles.fab} icon="filter" onPress={() => setModalVisible(true)} />
          ) : null}
        </View>
      </View>
      <Modal visible={modalVisible} dismiss={() => setModalVisible(false)} icon="filter">
        <StatisticsFilters selectables={selectableIds} onSelect={selectId} />
      </Modal>
    </>
  );
};

export default Statistics;
