import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { BottomNavigation } from 'react-native-paper';
import { CountersScreen, StatisticsScreen } from './Screens';
import { color } from './config/styles';

const styles = StyleSheet.create({
  navigationBar: {
    backgroundColor: color.COLOR_PRIMARY,
  },
});

export const Routes = () => {
  const [index, setIndex] = useState(0);
  const routes = [
    { key: 'counters', title: 'Counters', icon: 'counter' },
    { key: 'statistics', title: 'Statistics', icon: 'chart-bar' },
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
      renderScene={renderScene}
      barStyle={styles.navigationBar}
      activeColor={color.COLOR_SECONDARY}
      inactiveColor={color.COLOR_TERTIARY}
    />
  );
};

export default Routes;
