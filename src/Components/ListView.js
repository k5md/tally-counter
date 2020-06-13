import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SortableList from 'react-native-sortable-list';
import { EntryContainer } from './';

const styles = StyleSheet.create({
  block: {
    flex: 0,
    margin: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    flex: 1,
  },
  contentContainer: {
    width: window.width,
    paddingHorizontal: 0,
  },
});

export class ListView extends Component {
  constructor() {
    super();
  }

  render() {
    const { data, onOrderChange, sortable } = this.props;

    return (
      <SortableList
        style={styles.list}
        contentContainerStyle={styles.contentContainer}
        data={data}
        sortingEnabled={sortable}
        renderRow={({ active, data, key, index }) => {
          return (
            <EntryContainer key={index} entry={data} style={styles.block} />
          );
        }}
      />
    );
  }
}
