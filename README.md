# [Tally Counter](https://play.google.com/store/apps/details?id=com.k5md.tallycounter)

## Description

Tally counter is a great tool for tracking any discrete values.
- It stores every action, allows to filter statistics, so that one could easily see their progress.
- Counters could be viewed in list or grid mode to track everything!
- Rearrange counters simply by drag'n'drop!
- Set up either background color or image for each counter to easily find them!
- Set arbitrary step, initial value and title for each tally
- Easy search by counter title

## Visuals

Create|Change|Remove|Change view|Move|Statistics
:---:|:---:|:---:|:---:|:---:|:---:|
![tc_create.gif](https://s6.gifyu.com/images/tc_create.gif) | ![tc_change.gif](https://s6.gifyu.com/images/tc_change.gif) | ![tc_remove.gif](https://s6.gifyu.com/images/tc_remove.gif) | ![tc_changeView.gif](https://s6.gifyu.com/images/tc_changeView.gif) | ![tc_move.gif](https://s6.gifyu.com/images/tc_move.gif) | ![tc_stats.gif](https://s6.gifyu.com/images/tc_stats.gif)

## Development

In order to develop the application or build android .apk from the sources one should:
1. Clone this repository
2. Install dependencies with `npm install`
3. run Metro bundler with `react-native start`
4. Connect an emulator or physical device via adb, like this (tested with [mEMU](https://www.memuplay.com/)):
	- `adb connect 127.0.0.1:21503`
	- `adb reverse tcp:8081 tcp:8081`
5. build and watch with `react-native run-android`

In case of cache issues run `gradlew clean` from the project's android directory