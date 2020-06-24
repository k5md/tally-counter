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

const contentInset = { top: 10, bottom: 10 }

export const StatisticsPlot = ({ data }) => {
   return (
    <View style={styles.plot}>
      <View style={{ flex: 6, marginHorizontal: 10 }}>

        <LineChart
          style={{ flex: 5 }}
          data={data}
          svg={{ stroke: 'rgb(134, 65, 244)' }}
          xAccessor={({ item }) => item.hour}
          yAccessor={({ item }) => item.value}
          contentInset={contentInset}
          curve={shape.curveStepBefore}
 
        >
          <Grid/>
        </LineChart>
        <XAxis
          style={{flex: 2}}
          data={data}
          svg={{
            fill: "grey",
            fontSize: 12,
            rotation: 45,
            originY: 30,
            y: 30
          }}
          contentInset={contentInset}
          xAccessor={({ item }) => item.hour}
          formatLabel={value => String(value).length < 2 ? `0${String(value)}:00` : `${String(value)}:00`}
          numberOfTicks={26}
        />
      </View>
    </View>
  );
};
