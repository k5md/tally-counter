import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SortableGrid from 'react-native-sortable-grid';
import { EntryContainer } from './';

const styles = StyleSheet.create({
  block: {
    flex: 1,
    margin: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export class ListView extends Component {
  constructor() {
    super();
  }

  render() {
    const { data, onOrderChange } = this.props;

    return (
      <SortableGrid
        blockTransitionDuration={400}
        activeBlockCenteringDuration={200}
        dragActivationTreshold={200}
        itemsPerRow={1}
        onDragRelease={itemOrder => console.log(itemOrder)}>
        {data.map((entry, index) => (
          <EntryContainer key={index} entry={entry} style={styles.block} />
        ))}
      </SortableGrid>
    );
  }
}
