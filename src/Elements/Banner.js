import React from 'react';
import { View } from 'react-native';
import { BannerAd, BannerAdSize, TestIds } from '@react-native-firebase/admob';
import { screenWidth } from '../config/metrics';

const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-1059497387348503/9593700328';

const Banner = () => (
  <View style={[{ width: screenWidth, marginVertical: -10 }]}>
    <BannerAd
      unitId={adUnitId}
      size={BannerAdSize.SMART_BANNER}
      requestOptions={{
        requestNonPersonalizedAdsOnly: true,
      }}
    />
  </View>
);

export default Banner;
