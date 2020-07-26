import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { BottomNavigation } from 'react-native-paper';
import { CountersScreen, StatisticsScreen } from './Screens';
import { color } from './config/styles';
import { translate } from './localizations';

const styles = StyleSheet.create({
  navigationBar: {
    backgroundColor: color.COLOR_PRIMARY,
  },
});

export const Routes = () => {
  const [index, setIndex] = useState(0);
  const routes = [
    { key: 'counters', title: translate('Counters'), icon: 'counter' },
    { key: 'statistics', title: translate('Statistics'), icon: 'chart-bar' },
  ];
  const navigationState = { index, routes };
  const renderScene = BottomNavigation.SceneMap({
    counters: CountersScreen,
    statistics: StatisticsScreen,
  });

  return (
    <BottomNavigation
      navigationState={navigationState}
      onIndexChange={setIndex}
      renderScene={nav => (routes[index].key !== nav.route.key ? null : renderScene(nav))}
      barStyle={styles.navigationBar}
      activeColor={color.COLOR_SECONDARY}
      inactiveColor={color.COLOR_TERTIARY}
    />
  );
};

export default Routes;
