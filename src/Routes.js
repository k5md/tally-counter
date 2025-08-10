import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { BottomNavigation } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { MaterialDesignIcons as Icon } from '@react-native-vector-icons/material-design-icons';
import { CountersScreen, StatisticsScreen } from './Screens';
import { color, fontSizes } from './config/styles';
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
    <SafeAreaProvider>
      <BottomNavigation
        navigationState={navigationState}
        onIndexChange={setIndex}
        renderScene={nav =>
          routes[index].key !== nav.route.key && nav.route.key !== 'counters' ? null : renderScene(nav)
        }
        renderIcon={({ route: { icon }, focused }) => <Icon color={color.COLOR_TERTIARY} size={fontSizes.FONT_SIZE_SMALL} name={icon} />}
        barStyle={styles.navigationBar}
        activeColor={color.COLOR_SECONDARY}
        inactiveColor={color.COLOR_TERTIARY}
      />
    </SafeAreaProvider>
  );
};

export default Routes;
