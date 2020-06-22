import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { LineChart, YAxis, XAxis, Grid } from 'react-native-svg-charts';

export const Statistics = ({ read, data }) => {
  useEffect(() => {
    setInterval(() => read(), 5000);
  }, []);

  const dat = [50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80];

  const contentInset = { top: 20, bottom: 20 };

  return (
    <>
    <Text>{JSON.stringify(data)}</Text>
    <View style={{ height: '100%', padding: 20, flexDirection: 'row' }}>
      <YAxis
        data={dat}
        contentInset={contentInset}
        svg={{
          fill: 'grey',
          fontSize: 10,
        }}
        numberOfTicks={10}
        formatLabel={value => `${value}ºC`}
      />
      <View style={{ flex: 1, marginLeft: 10, marginRight: 10 }}>
        <LineChart
          style={{ flex: 1, marginLeft: 16 }}
          data={dat}
          svg={{ stroke: 'rgb(134, 65, 244)' }}
          contentInset={contentInset}
        >
          <Grid />
        </LineChart>
        <XAxis
          style={{ marginHorizontal: -10 }}
          data={dat}
          formatLabel={(value, index) => index}
          contentInset={{ left: 10, right: 10 }}
          svg={{ fontSize: 10, fill: 'black' }}
        />
      </View>
    </View>
    </>
  );
};
