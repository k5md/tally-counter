import React from 'react';
import { StyleSheet, View, Text, FlatList, PanResponder, Animated } from 'react-native';

export default class DragAndDrop extends React.Component {
  state = {
    dragging: false,
    draggingIndex: -1,
    data: this.props.data,
    order: this.props.data
      .map((item, index) => [this.props.keyExtractor(item), index])
      .reduce((acc, [key, index]) => ({ ...acc, [key]: index }), {}),
  };

  _panResponder = null;
  point = new Animated.ValueXY();
  currentY = 0;
  scrollOffset = 0;
  flatlistTopOffset = 0;
  rowHeight = 0;
  currentIndex = -1;
  active = false;

  onPanResponderGrant = (evt, gestureState) => {
    this.currentIndex = this.yToIndex(gestureState.y0);
    this.currentY = gestureState.y0;
    Animated.event([{ y: this.point.y }], { useNativeDriver: false })({
      y: gestureState.y0 - this.rowHeight / 2,
    });
    this.active = true;
    this.setState({ draggingIndex: this.currentIndex, dragging: true });
    return true;
  };

  onPanResponderMove = (evt, gestureState) => {
    this.currentY = gestureState.moveY;
    Animated.event([{ y: this.point.y }], { useNativeDriver: false })({
      y: gestureState.moveY,
    });
    const newIndex = this.yToIndex(this.currentY);
    if (this.currentIndex !== newIndex) {
      this.setState({
        order: {
          ...this.state.order,
          [this.state.data[this.currentIndex].id]: newIndex,
          [this.state.data[newIndex].id]: this.currentIndex,
        },
        draggingIndex: newIndex,
      });
      this.currentIndex = newIndex;
    }
    return true;
  };

  onPanResponderRelease = (evt, gestureState) => {
    this.active = false;
    this.setState({ draggingIndex: -1, dragging: false });
    this.point.flattenOffset();
    return true;
  };

  onPanResponderTerminate = (evt, gestureState) => {
    this.active = false;
    this.setState({ draggingIndex: -1, dragging: false });
    return true;
  };

  constructor(props) {
    super(props);
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
      onPanResponderGrant: this.onPanResponderGrant,
      onPanResponderMove: this.onPanResponderMove,
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: this.onPanResponderRelease,
      onPanResponderTerminate: this.onPanResponderTerminate,
      onShouldBlockNativeResponder: (evt, gestureState) => true,
    });
  }

  yToIndex = y => {
    const value = Math.floor((this.scrollOffset + y - this.flatlistTopOffset) / this.rowHeight);
    if (value < 0) {
      return 0;
    }
    if (value > this.state.data.length - 1) {
      return this.state.data.length - 1;
    }
    return value;
  };

  render() {
    const { renderer: Renderer, listItemStyling } = this.props;
    const { dragging, draggingIndex, data } = this.state;
    const renderItemWrapper = ({ item, index }) => (
      <View
        style={{ opacity: draggingIndex === index ? 0 : 1, ...listItemStyling }}
        onLayout={e => {
          this.rowHeight = e.nativeEvent.layout.height;
        }}
        {...this._panResponder.panHandlers}
      >
        <Renderer item={item} />
      </View>
    );
    return (
      <View style={styles.container}>
        {dragging && (
          <Animated.View
            style={{
              zIndex: 2,
              top: this.point.getLayout().top,
              // transform: this.point.getTranslateTransform(),
              width: '100%',
              position: 'absolute',
            }}
          >
            {renderItemWrapper({ item: data[draggingIndex], index: -1 }, true)}
          </Animated.View>
        )}
        <FlatList
          style={{ width: '100%' }}
          data={data}
          renderItem={renderItemWrapper}
          onScroll={e => {
            this.scrollOffset = e.nativeEvent.contentOffset.y;
          }}
          onLayout={e => {
            this.flatlistTopOffset = e.nativeEvent.layout.y;
          }}
          scrollEventThrottle={10}
          keyExtractor={item => '' + item.id}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

module.exports = { SortableGrid: DragAndDrop };
