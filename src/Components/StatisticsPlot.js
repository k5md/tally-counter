import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, FlatList } from 'react-native';
import { Picker } from '@react-native-community/picker';
import { Button, Paragraph, Dialog, Portal, DataTable, FAB } from 'react-native-paper';
import { LineChart, YAxis, XAxis, Grid } from 'react-native-svg-charts';
import * as scale from 'd3-scale';
import * as shape from 'd3-shape';
import { StatisticsTable } from './';

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
    flex: 4,
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

export const StatisticsPlot = ({ data }) => {
  console.log(data, 'DATA')

  return (
    <View style={styles.plot}>
      <View style={{ flex: 4, marginLeft: 10, marginRight: 10 }}>

        <LineChart
          style={{ flex: 1, marginLeft: 16 }}
          data={data}
          svg={{ stroke: 'rgb(134, 65, 244)' }}
          xAccessor={({ item }) => item.hourString}
          yAccessor={({ item }) => item.value}
          xScale={scale.scaleTime}
          curve={shape.curveStepBefore}
          numberOfTicks={24}
        >
          <Grid />
        </LineChart>
        <XAxis
          data={data}
          svg={{
            fill: 'black',
            fontSize: 8,
          }}
          style={{ marginHorizontal: 15 }}
          xAccessor={({ item }) => item.hourString}
          scale={scale.scaleTime}
          formatLabel={value => new Date(value).toLocaleTimeString()}
          numberOfTicks={24}
        />
      </View>
    </View>
  );
};
