import React from 'react';
import { View } from 'react-native';
import { BannerAd, BannerAdSize, TestIds } from '@react-native-firebase/admob';

const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-1059497387348503/9593700328';

const Banner = () => (
  <View>
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
