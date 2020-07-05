/* eslint-disable eqeqeq */
import React, { Component } from 'react';
import { Animated, TouchableWithoutFeedback, PanResponder, View, ScrollView } from 'react-native';
import { sortBy, noop } from 'lodash';
import { styles } from './styles';
import { animateTiming } from './utils';
import { SortableGridDefaultProps, SortableGridPropTypes } from './types';

export class SortableGrid extends Component {
  itemOrder = {};
  blockPositions = {};
  activeBlock = null;
  gridHeight = 0;
  blockWidth = 0;
  panCapture = false;
  panResponder = PanResponder.create({
    onStartShouldSetPanResponderCapture: () => false,
    onMoveShouldSetPanResponder: () => this.panCapture,
    onMoveShouldSetPanResponderCapture: () => this.panCapture,
    onPanResponderGrant: (evt, gestureState) => this.onGrantBlock(evt, gestureState),
    onPanResponderMove: (evt, gestureState) => this.onMoveBlock(evt, gestureState),
    onPanResponderRelease: (evt, gestureState) => this.onReleaseBlock(evt, gestureState),
  });

  // scrollable properties
  activeBlockOffset = null;
  scrollView = React.createRef();
  containerHeight = 0;
  scrollOffset = { x: 0, y: 0 };
  keepScrolling = null;

  constructor() {
    super();
  }

  UNSAFE_componentWillUpdate = (nextProps, nextState) => {
    const { itemOrder, children, itemsPerRow, blockHeight } = nextProps;
    this.gridHeight = blockHeight * Math.ceil(children.length / itemsPerRow);
    this.blockWidth = (this.blockWidth * this.props.itemsPerRow) / itemsPerRow;

    const oldBlockPositions = Object.keys(this.blockPositions);
    oldBlockPositions.forEach(
      key => !children.find(child => child.key == key) && delete this.blockPositions[key],
    );

    this.itemOrder = {};
    itemOrder.forEach((key, index) => {
      this.itemOrder[key] = { key, order: index };
      const x = (index % itemsPerRow) * this.blockWidth;
      const y = Math.floor(index / itemsPerRow) * blockHeight;

      if (!this.blockPositions[key]) {
        this.blockPositions[key] = {
          currentPosition: new Animated.ValueXY({ x, y }),
          origin: { x, y },
        };
      } else {
        this.getBlock(key).origin = { x, y };
        this.getBlock(key).currentPosition.setValue({ x, y });
      }
    });
  };

  onGrantBlock = (evt, gestureState) => {
    const activeBlockPosition = this.getActiveBlock().origin;
    const x = activeBlockPosition.x - gestureState.x0;
    const y = activeBlockPosition.y - gestureState.y0 - this.scrollOffset.y;
    this.activeBlockOffset = { x, y };
  };

  onMoveBlock = (evt, gestureState) => {
    const dragPosition = {
      x: gestureState.moveX + this.activeBlockOffset.x,
      y: gestureState.moveY + this.activeBlockOffset.y,
    };
    const activeBlock = this.getActiveBlock();
    const originalPosition = activeBlock.origin;
    //scroll part
    const scrollThreshold = this.props.blockHeight / 5;
    const scrollUp = dragPosition.y < scrollThreshold;
    const scrollDown = dragPosition.y > this.containerHeight - scrollThreshold;
    const scrollBy = (scrollUp * -1 + scrollDown * 1) * scrollThreshold;

    if (scrollUp || scrollDown) {
      if (!this.keepScrolling) {
        this.keepScrolling = setInterval(() => {
          this.scrollView.current.scrollTo({ y: this.scrollOffset.y + scrollBy });
          const dragPositionWithScroll = { x: dragPosition.x, y: dragPosition.y + this.scrollOffset.y };
          //activeBlock.currentPosition.setValue(dragPositionWithScroll);
          animateTiming(activeBlock.currentPosition, dragPositionWithScroll);
          this.moveBlock(originalPosition, dragPositionWithScroll);
        }, 100);
      }
    } else {
      this.keepScrolling = clearInterval(this.keepScrolling);
      const dragPositionWithScroll = { x: dragPosition.x, y: dragPosition.y + this.scrollOffset.y };
      activeBlock.currentPosition.setValue(dragPositionWithScroll);
      this.moveBlock(originalPosition, dragPositionWithScroll);
    }
    //scroll part
  };

  moveBlock = (originalPosition, currentPosition) => {
    const activeBlock = this.getActiveBlock();
    let closest = this.activeBlock;
    let closestDistance = this.getDistanceTo(currentPosition, originalPosition);

    // find closest block
    for (let key in this.blockPositions) {
      const block = this.blockPositions[key];
      const blockPosition = block.origin;
      const distance = this.getDistanceTo(currentPosition, blockPosition);
      if (distance < closestDistance && distance < this.blockWidth) {
        closest = key;
        closestDistance = distance;
      }
    }

    if (closest == this.activeBlock) {
      return;
    }

    //swap block positions
    const closestBlock = this.getBlock(closest);
    animateTiming(closestBlock.currentPosition, activeBlock.origin);
    activeBlock.origin = closestBlock.origin;
    closestBlock.origin = originalPosition;

    //swap item orders
    const tempOrder = this.itemOrder[this.activeBlock].order;
    this.itemOrder[this.activeBlock].order = this.itemOrder[closest].order;
    this.itemOrder[closest].order = tempOrder;
  };

  onReleaseBlock = () => {
    this.keepScrolling = clearInterval(this.keepScrolling);
    const activeBlock = this.getActiveBlock();
    animateTiming(activeBlock.currentPosition, activeBlock.origin);
    this.deactivateDrag();
  };

  deactivateDrag = () => {
    const itemOrder = sortBy(this.itemOrder, item => item.order).map(item => item.key);
    this.panCapture = false;
    this.props.onDragRelease({ itemOrder });
    this.activeBlock = null;
    this.forceUpdate();
  };

  activateDrag = key => () => {
    this.panCapture = true;
    this.activeBlock = key;
    this.forceUpdate();
  };

  getActiveBlock = () => this.blockPositions[this.activeBlock];

  getBlock = key => this.blockPositions[key];

  blockPositionsSet = () => Object.keys(this.blockPositions).length == this.props.children.length;

  getDistanceTo = (pointA, pointB) => {
    const xDistance = pointA.x - pointB.x;
    const yDistance = pointA.y - pointB.y;
    return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
  };

  onGridLayout = ({ nativeEvent }) => {
    this.blockWidth = nativeEvent.layout.width / this.props.itemsPerRow;
    this.forceUpdate();
  };

  getGridStyle = () => [
    styles.sortableGrid,
    this.blockPositionsSet() && { height: this.gridHeight },
  ];

  getBlockStyle = key => [
    {
      width: this.blockWidth,
      height: this.props.blockHeight,
      justifyContent: 'center',
    },
    this.blockPositionsSet() && {
      position: 'absolute',
      transform: this.getBlock(key).currentPosition.getTranslateTransform(),
    },
    this.activeBlock == key && { zIndex: 1 },
  ];

  onScrollLayout = ({ nativeEvent }) => {
    this.containerHeight = nativeEvent.layout.height;
  };

  onScroll = ({ nativeEvent }) => {
    this.scrollOffset = nativeEvent.contentOffset;
  };

  renderEntry = item => (
    <Animated.View
      key={item.key}
      style={this.getBlockStyle(item.key)}
      {...this.panResponder.panHandlers}
    >
      <TouchableWithoutFeedback
        style={styles.container}
        delayLongPress={this.props.dragActivationTreshold}
        onPress={() => console.log(this.blockPositions[item.key])}
        onLongPress={item.inactive ? noop : this.activateDrag(item.key)}
      >
        <View style={styles.itemImageContainer}>
          <View style={styles.container}>{item}</View>
        </View>
      </TouchableWithoutFeedback>
    </Animated.View>
  );

  render = () => (
    <ScrollView
      scrollEnabled={false}
      ref={this.scrollView}
      onLayout={this.onScrollLayout}
      onScroll={this.onScroll}
    >
      <Animated.View style={this.getGridStyle()} onLayout={this.onGridLayout}>
        {this.props.children.map(this.renderEntry)}
      </Animated.View>
    </ScrollView>
  );
}

SortableGrid.propTypes = SortableGridPropTypes;
SortableGrid.defaultProps = SortableGridDefaultProps;

export default SortableGrid;
