import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Searchbar } from 'react-native-paper';
import SortableGrid from 'react-native-yet-another-sortable';
import EntryContainer from './EntryContainer';
import { color } from '../../config/styles';
import { navBarHeight, blocksPerRow, blockHeightGrid, blockHeightList } from '../../config/metrics';
import { translate } from '../../localizations';

const styles = StyleSheet.create({
  countersCollection: {
    marginBottom: navBarHeight,
  },
  block: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchInput: {
    backgroundColor: color.COLOR_SECONDARY,
    color: color.COLOR_TERTIARY,
    paddingVertical: 0,
  },
  search: {
    backgroundColor: color.COLOR_SECONDARY,
    borderRadius: 0,
    color: color.COLOR_TERTIARY,
  },
});

const CountersCollection = ({ data, order, displayType, rearrange }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const filtered = Object.values(data)
    .filter(counter => counter && counter.title.toLowerCase().includes(searchQuery))
    .map(counter => ({ ...counter, key: String(counter.id) }));
  const sortable = searchQuery === '';
  const renderItem = entry => (
    <EntryContainer id={entry.id} entry={entry} style={styles.block} inactive={!sortable} />
  );

  return (
    <View style={styles.countersCollection}>
      <Searchbar
        placeholder={translate('Search')}
        onChangeText={value => setSearchQuery(value.toLowerCase())}
        value={searchQuery}
        inputStyle={styles.searchInput}
        style={styles.search}
        iconColor={styles.search.color}
      />
      <SortableGrid
        columns={displayType.name === 'grid' ? blocksPerRow : 1}
        rowHeight={displayType.name === 'grid' ? blockHeightGrid : blockHeightList}
        order={order}
        data={filtered}
        onDeactivateDrag={rearrange}
        renderItem={renderItem}
      />
    </View>
  );
};

export default CountersCollection;
