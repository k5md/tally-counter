## Development

In order to develop the application or build android .apk from the sources one should:
1. Clone this repository
2. Install dependencies with `npm install`
3. run Metro bundler with `react-native start`
4. Connect an emulator or physical device via adb, like this (tested with [mEMU](https://www.memuplay.com/)):
	- `adb connect 127.0.0.1:21503`
	- `adb reverse tcp:8081 tcp:8081`
5. build and watch with `react-native run-android`
