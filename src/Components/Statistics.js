import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { Picker } from '@react-native-community/picker';
import { StatisticsTable } from './';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  controls: {
    flexDirection: 'row',
  },
  table: {
    flex: 9,
  },
});

export const Statistics = ({ read, stats, counters }) => {
  const now = new Date();
  const cloneDate = date => new Date(date.valueOf());
  const selectableFrames = [
    { title: '1d', window: [cloneDate(now).setDate(now.getDate() - 1), now.getTime()] },
    { title: '3d', window: [cloneDate(now).setDate(now.getDate() - 3), now.getTime()] },
    { title: 'M', window: [cloneDate(now).setMonth(now.getMonth() - 1), now.getTime()] },
    { title: 'Y', window: [cloneDate(now).setFullYear(now.getFullYear() - 1), now.getTime()] },
    { title: 'All', window: [0, now.getTime()] },
  ];
  const [selectedFrame, selectFrame] = useState(selectableFrames[0]);

  useEffect(() => {
    read(selectedId.id, selectedFrame.window);
  }, [read, selectedId, selectedFrame]);

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

  const selectableIds = Object.values(counters).map(({ id, title }) => ({ id, title }));
  const [selectedId, selectId] = useState(selectableIds[0]);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.controls}>
          {selectableFrames.map(({ title }, frameIndex) => (
            <Button
              mode="contained"
              dark={title === selectedFrame.title}
              onPress={() => selectFrame(selectableFrames[frameIndex])}
            >
              {title}
            </Button>
          ))}
          <Picker selectedValue={selectedId} style={{ flex: 1 }} onValueChange={id => selectId(id)}>
            {selectableIds.map(({ id, title }) => (
              <Picker.Item label={title} value={id} />
            ))}
          </Picker>
        </View>

        <StatisticsTable style={styles.table} data={formattedStats} />
      </View>
    </>
  );
};
