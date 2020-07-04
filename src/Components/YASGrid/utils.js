import { Animated } from 'react-native';

export const animateTiming = (from, to, duration = 200) =>
  Animated.timing(from, {
    toValue: to,
    duration,
    useNativeDriver: true,
  }).start();
