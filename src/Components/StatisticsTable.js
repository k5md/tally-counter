import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, FlatList } from 'react-native';
import { Button, Paragraph, Dialog, Portal, DataTable, FAB } from 'react-native-paper';

const styles = StyleSheet.create({
  item: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#f9c2ff',
    padding: 20,
  },
});

const Item = ({ title, date, time, value }) => (
  <DataTable.Row style={[styles.item]}>
    <DataTable.Cell>{date}</DataTable.Cell>
    <DataTable.Cell>{title}</DataTable.Cell>
    <DataTable.Cell>{time}</DataTable.Cell>
    <DataTable.Cell numeric>{value}</DataTable.Cell>
  </DataTable.Row>
);

export const StatisticsTable = ({ style, data }) => (
  <SafeAreaView style={[style]}>
    <DataTable>
      <DataTable.Header>
        <DataTable.Title>Date</DataTable.Title>
        <DataTable.Title>Title</DataTable.Title>
        <DataTable.Title>Time</DataTable.Title>
        <DataTable.Title numeric>Value</DataTable.Title>
      </DataTable.Header>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <Item title={item.title} date={item.date} time={item.time} value={item.value} />
        )}
        keyExtractor={item => String(item.milliseconds)}
      />
    </DataTable>
  </SafeAreaView>
);
