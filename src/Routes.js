import React, { useState } from 'react';
import { BottomNavigation } from 'react-native-paper';
import { CountersScreen, StatisticsScreen } from './Screens';

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
    />
  );
};

export default Routes;
