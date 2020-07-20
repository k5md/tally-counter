import React from 'react';
import { StyleSheet, SafeAreaView, FlatList } from 'react-native';
import { DataTable, Text } from 'react-native-paper';
import { color, fontSizes, fonts } from '../config/styles';

const styles = StyleSheet.create({
  item: {
    flex: 1,
    flexDirection: 'row',
    padding: 20,
  },
  tableContainer: {
    backgroundColor: color.COLOR_SECONDARY,
  },
  cellText: {
    color: color.COLOR_TERTIARY,
  },
  headerText: {
    color: color.COLOR_PRIMARY,
    fontSize: fontSizes.FONT_SIZE_MINI,
  },
});

const Header = () => (
  <DataTable.Header>
    <DataTable.Title>
      <Text style={styles.headerText}>Date</Text>
    </DataTable.Title>
    <DataTable.Title>
      <Text style={styles.headerText}>Title</Text>
    </DataTable.Title>
    <DataTable.Title>
      <Text style={styles.headerText}>Time</Text>
    </DataTable.Title>
    <DataTable.Title numeric>
      <Text style={styles.headerText}>Value</Text>
    </DataTable.Title>
  </DataTable.Header>
);

const Row = ({ title, date, time, value }) => (
  <DataTable.Row style={styles.item}>
    <DataTable.Cell>
      <Text style={styles.cellText}>{date}</Text>
    </DataTable.Cell>
    <DataTable.Cell>
      <Text style={styles.cellText}>{title}</Text>
    </DataTable.Cell>
    <DataTable.Cell>
      <Text style={styles.cellText}>{time}</Text>
    </DataTable.Cell>
    <DataTable.Cell numeric>
      <Text style={styles.cellText}>{value}</Text>
    </DataTable.Cell>
  </DataTable.Row>
);

export const StatisticsTable = ({ style, data }) => (
  <SafeAreaView style={[styles.tableContainer, style]}>
    <DataTable>
      <Header />
      <FlatList
        data={data}
        renderItem={({ item }) => <Row {...item} />}
        keyExtractor={item => String(item.milliseconds)}
      />
    </DataTable>
  </SafeAreaView>
);

export default StatisticsTable;
