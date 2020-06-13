import React, {useState} from 'react';
import {BottomNavigation} from 'react-native-paper';
import {TallyCounters, Statistics} from './Pages';

export const Routes = () => {
  const [index, setIndex] = useState(0);
  const routes = [
    {key: 'tallyCounters', title: 'Counters', icon: 'counter'},
    {key: 'statistics', title: 'Statistics', icon: 'chart-bar'},
  ];
  const navigationState = {index, routes};

  const renderScene = BottomNavigation.SceneMap({
    tallyCounters: TallyCounters,
    statistics: Statistics,
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
