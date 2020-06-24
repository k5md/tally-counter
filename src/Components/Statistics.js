import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, FlatList } from 'react-native';
import { Picker } from '@react-native-community/picker';
import { Button, Paragraph, Dialog, Portal, DataTable, FAB } from 'react-native-paper';
import { LineChart, YAxis, XAxis, Grid } from 'react-native-svg-charts';
import * as scale from 'd3-scale';
import * as shape from 'd3-shape';
import { StatisticsTable, StatisticsPlot } from './';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  title: {
    fontSize: 32,
  },
  plot: {
    height: '50%',
    padding: 20,
    flexDirection: 'column',
  },
  table: {
    height: '50%',
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
  },
});

export const Statistics = ({ read, stats, counters }) => {
  if (!Object.values(counters).length) {
    return null;
  }

  const selectableIds = Object.values(counters).map(({ id, title }) => ({ id, title }));
  const selectableScales = [{ id: 'day', title: 'Day' }, { id: 'month', title: 'Month' }];

  const [selectedId, selectId] = useState(selectableIds[0].id);
  const [selectedScale, selectScale] = useState(selectableScales[0].id);

  useEffect(() => {
    read(selectedId, selectedScale);
  }, [read, selectedId, selectedScale]);

  const formattedByHour = stats[1].reduce((acc, { value, date, hour }, currentIndex, array) => {
    const toPush = { value, date, hour: Number(hour) };
    if (!acc.length && toPush.hour > 0) {
      return [{ value, date, hour: 0 }, toPush];
    }
    if (currentIndex === array.length - 1 && toPush.hour < 23) {
      return [...acc, toPush, { value, date, hour: 23 }];
    }
    return [...acc, toPush];
  }, []);

  const formattedByDay = stats[2];

  const formattedByDatetime = stats[0].map(({ value, id, date }) => {
    const { title } = counters[id];
    const dateObject = new Date(date);
    const milliseconds = dateObject.getTime();
    const localeDate = dateObject.toLocaleDateString();
    const localeTime = dateObject.toLocaleTimeString();
    return {
      value,
      title,
      milliseconds,
      date: localeDate,
      time: localeTime,
    };
  });

  console.log('byHour', formattedByHour, '\n', 'by day', formattedByDay);

  return (
    <>
      <View style={styles.container}>
        <StatisticsPlot data={formattedByHour} />

        <View style={{ flex: 1, marginHorizontal: 10 }}>
          <Picker selectedValue={selectedScale} onValueChange={value => selectScale(value)}>
            {selectableScales.map(({ id, title }) => (
              <Picker.Item label={title} value={id} key={id} />
            ))}
          </Picker>

          <Picker selectedValue={selectedId} onValueChange={value => selectId(value)}>
            {selectableIds.map(({ id, title }) => (
              <Picker.Item label={title} value={id} key={id} />
            ))}
          </Picker>
        </View>

        <StatisticsTable style={styles.table} data={formattedByDatetime} />
      </View>
      <View style={styles.fabContainer}>
        <FAB style={styles.fab} icon="refresh" onPress={() => read(selectedId, selectedScale)} />
      </View>
    </>
  );
};
