import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, FlatList } from 'react-native';
import { Picker } from '@react-native-community/picker';
import { Button, Paragraph, Dialog, Portal, DataTable, FAB } from 'react-native-paper';
import { LineChart, YAxis, XAxis, Grid } from 'react-native-svg-charts';
import * as scale from 'd3-scale';
import * as shape from 'd3-shape';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  item: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#f9c2ff',
    padding: 20,
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

const Item = ({ title, date, time, value }) => {
  return (
    <DataTable.Row style={[styles.item]}>
      <DataTable.Cell>{date}</DataTable.Cell>
      <DataTable.Cell>{title}</DataTable.Cell>
      <DataTable.Cell>{time}</DataTable.Cell>
      <DataTable.Cell numeric>{value}</DataTable.Cell>
    </DataTable.Row>
  );
};

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

  const formatted = stats.map(({ value, id, date }) => {
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

  return (
    <>
      <View style={styles.container}>
        <View style={styles.plot}>
          <View style={{ flex: 4, marginLeft: 10, marginRight: 10 }}>
            <LineChart
              style={{ flex: 1, marginLeft: 16 }}
              data={formatted}
              svg={{ stroke: 'rgb(134, 65, 244)' }}
              xAccessor={({ item }) => item.milliseconds}
              yAccessor={({ item }) => item.value}
              xScale={scale.scaleTime}
              curve={shape.curveStep}
            >
              <Grid />
            </LineChart>
            <XAxis
              data={formatted}
              svg={{
                fill: 'black',
                fontSize: 8,
              }}
              style={{ marginHorizontal: 15 }}
              xAccessor={({ item }) => item.milliseconds}
              scale={scale.scaleTime}
              formatLabel={value => new Date(value).toLocaleTimeString()}
              numberOfTicks={24}
            />
          </View>
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
        </View>

        <SafeAreaView style={styles.table}>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title>Date</DataTable.Title>
              <DataTable.Title>Title</DataTable.Title>
              <DataTable.Title>Time</DataTable.Title>
              <DataTable.Title numeric>Value</DataTable.Title>
            </DataTable.Header>
            <FlatList
              data={formatted}
              renderItem={({ item }) => (
                <Item title={item.title} date={item.date} time={item.time} value={item.value} />
              )}
              keyExtractor={item => String(item.milliseconds)}
            />
          </DataTable>
        </SafeAreaView>
      </View>

      <View style={styles.fabContainer}>
        <FAB style={styles.fab} icon="refresh" onPress={() => read(selectedId, selectedScale)} />
      </View>
    </>
  );
};
