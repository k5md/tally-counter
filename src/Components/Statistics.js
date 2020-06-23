import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, FlatList } from 'react-native';
import { Picker } from '@react-native-community/picker';
import { Button, Paragraph, Dialog, Portal, DataTable, FAB } from 'react-native-paper';
import { LineChart, YAxis, XAxis, Grid } from 'react-native-svg-charts';
import * as scale from 'd3-scale';

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    flexDirection: 'row',
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

const Item = ({ id, date, time, value }) => {
  return (
    <DataTable.Row style={[styles.item]}>
      <DataTable.Cell>{date}</DataTable.Cell>
      <DataTable.Cell numeric>{id}</DataTable.Cell>
      <DataTable.Cell>{time}</DataTable.Cell>
      <DataTable.Cell numeric>{value}</DataTable.Cell>
    </DataTable.Row>
  );
};

export const Statistics = ({ read, data }) => {
  const formatted = data.map(entry => {
    const dateObject = new Date(entry.date);
    const milliseconds = dateObject.getTime();
    const date = dateObject.toLocaleDateString();
    const time = dateObject.toLocaleTimeString();
    return {
      id: entry.id,
      milliseconds,
      date,
      time,
      value: entry.value,
    };
  });

  return (
    <>
      <View style={styles.container}>
        <View style={styles.plot}>
          <View style={{ flex: 1, marginLeft: 10, marginRight: 10 }}>
            <LineChart
              style={{ flex: 1, marginLeft: 16 }}
              data={formatted}
              svg={{ stroke: 'rgb(134, 65, 244)' }}
              xAccessor={({ item }) => item.milliseconds}
              yAccessor={({ item }) => item.value}
              xScale={scale.scaleTime}
            >
              <Grid />
            </LineChart>
            <XAxis
                data={formatted}
                svg={{
                  fill: 'black',
                  fontSize: 8,

                }}
                style={{ marginHorizontal: 15,  }}
                xAccessor={({ item }) => item.milliseconds}
                scale={scale.scaleTime}
                formatLabel={value => (new Date(value)).toLocaleTimeString()}
                numberOfTicks={24}
              />
          </View>
        </View>

        <SafeAreaView style={styles.table}>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title>Date</DataTable.Title>
              <DataTable.Title>Id</DataTable.Title>
              <DataTable.Title>Time</DataTable.Title>
              <DataTable.Title numeric>Value</DataTable.Title>
            </DataTable.Header>
            <FlatList
              data={formatted}
              renderItem={({ item }) => (
                <Item id={item.id} date={item.date} time={item.time} value={item.value} />
              )}
              keyExtractor={item => String(item.milliseconds)}
            />
          </DataTable>
        </SafeAreaView>
      </View>
      <View style={styles.fabContainer}>
        <FAB style={styles.fab} icon="refresh" onPress={() => read()} />
        <FAB style={styles.fab} label="1" />
        <FAB style={styles.fab} label="Month" />
      </View>
    </>
  );
};
