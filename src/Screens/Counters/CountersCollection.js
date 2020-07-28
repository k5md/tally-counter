import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { SortableGrid, Banner } from '../../Elements';
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
  },
  search: {
    backgroundColor: color.COLOR_SECONDARY,
    borderRadius: 0,
    color: color.COLOR_TERTIARY,
  },
});

const CountersCollection = ({ data, order, displayType, rearrange }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const filtered = Object.values(data).filter(
    counter => counter && counter.title.toLowerCase().includes(searchQuery),
  );
  const sortable = searchQuery === '';

  const displayAds =
    (displayType.name === 'grid' && Object.values(data).length > 8) ||
    (displayType.name === 'list' && Object.values(data).length > 4);

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
      {displayAds ? <Banner /> : null}
      <SortableGrid
        itemsPerRow={displayType.name === 'grid' ? blocksPerRow : 1}
        blockHeight={displayType.name === 'grid' ? blockHeightGrid : blockHeightList}
        itemOrder={order}
        onDragRelease={({ itemOrder }) => rearrange(itemOrder)}
      >
        {filtered.map(entry => {
          const { id } = entry;
          return (
            <EntryContainer
              key={id}
              id={id}
              entry={entry}
              style={styles.block}
              inactive={!sortable}
            />
          );
        })}
      </SortableGrid>
    </View>
  );
};

export default CountersCollection;
