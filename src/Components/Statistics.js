import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Button, ScrollView } from 'react-native';
import { FAB, Checkbox, Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import { StatisticsTable, Modal } from './';
import { getPrevDay, getPrevMonth, getPrevYear } from '../utils';
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
    backgroundColor: color.COLOR_PRIMARY,
    borderRadius: 10,
    textAlignVertical: 'center',
    textAlign: 'center',
  },
  buttonContent: {
    textAlignVertical: 'center',
    textAlign: 'center',
  },
  buttonLabel: {
    color: color.COLOR_TERTIARY,
    textAlignVertical: 'center',
    textAlign: 'center',
  },
  buttonLabelActive: {
    textAlignVertical: 'center',
    color: color.COLOR_SECONDARY,
    textAlign: 'center',
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

  modal: {
    marginHorizontal: 10,
  },
  formActionsContainer: {
    position: 'absolute',
    top: -20,
    right: 20,
    left: 20,
    zIndex: 2,
  },
  formActions: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  formContent: {
    backgroundColor: color.COLOR_SECONDARY,
    paddingTop: 50,
    paddingHorizontal: 20,
  },
});

const current = {
  get date() {
    return new Date();
  },
};

const selectableFrames = [
  { title: '1d', window: () => [getPrevDay(current.date), current.date.getTime()] },
  { title: '3d', window: () => [getPrevDay(current.date, 3), current.date.getTime()] },
  { title: 'M', window: () => [getPrevMonth(current.date), current.date.getTime()] },
  { title: 'Y', window: () => [getPrevYear(current.date), current.date.getTime()] },
  { title: 'All', window: () => [0, current.date.getTime()] },
];

const Statistics = ({ read, stats, counters }) => {
  const [selectedFrame, selectFrame] = useState(selectableFrames[0]);

  const selectableIds = Object.values(counters).map(({ id, title }) => ({ id, title }));

  if (!selectableIds.length) {
    return null;
  }

  const [selectedId, selectId] = useState(selectableIds[0]);

  useEffect(() => {
    read(selectedId.id, selectedFrame.window());
  }, [read, selectedId, selectedFrame, counters]);

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

  return (
    <>
      <View style={styles.container}>
        <View style={styles.controls}>
          <View style={styles.control}>
            {selectableFrames.map(({ title }, frameIndex) => (
              <Button
                disabled={title === selectedFrame.title}
                onPress={() => selectFrame(selectableFrames[frameIndex])}
                key={title}
                style={styles.button}
                contentStyle={styles.buttonContent}
                labelStyle={
                  title === selectedFrame.title ? styles.buttonLabel : styles.buttonLabelActive
                }
                title={title}
              />
            ))}
          </View>
        </View>

        <StatisticsTable style={styles.table} data={formattedStats} />

        <View style={styles.fabContainer}>
          <FAB style={styles.fab} icon="filter" onPress={() => setModalVisible(true)} />
        </View>
      </View>
      <Modal visible={modalVisible} onDismiss={() => setModalVisible(false)}>
        <View style={styles.modal}>
          <View style={styles.formActionsContainer}>
            <View style={styles.formActions}>
              <View style={styles.formAction}>
                <Icon
                  name="counter"

                  color={color.COLOR_SECONDARY}
                />
              </View>
              <View style={styles.formAction}>
                <ScrollView>
                  {selectableIds.map(({ id, title }) => (
                    <View>
                      <Text>{title}</Text>
                      <Checkbox />
                    </View>

                  ))}
                </ScrollView>
              </View>
            </View>
          </View>
          <View style={styles.formContent} />
        </View>
      </Modal>
    </>
  );
};

export default Statistics;
