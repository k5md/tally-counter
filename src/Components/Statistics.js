import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { StatisticsTable } from './';
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

  return (
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
            >
              {title}
            </Button>
          ))}
        </View>
      </View>

      <StatisticsTable style={styles.table} data={formattedStats} />
    </View>
  );
};

export default Statistics;
