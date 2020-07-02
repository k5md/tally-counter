/* eslint-disable eqeqeq */
import React, { PureComponent, Component } from 'react';
import { Animated, TouchableWithoutFeedback, PanResponder, View, ScrollView } from 'react-native';
import { sortBy, cloneDeep, noop, merge } from 'lodash';
import styles from './styles';
import { animateTiming } from './utils';

export class SortableGrid extends Component {
  itemOrder = {};
  blockPositions = {};
  activeBlock = null;
  blockPositionsSetCount = 0;
  gridHeight = 0;
  dragPosition = null;
  activeBlockOffset = null;
  panCapture = false;
  panResponder = PanResponder.create({
    onStartShouldSetPanResponderCapture: () => false,
    onMoveShouldSetPanResponder: () => this.panCapture,
    onMoveShouldSetPanResponderCapture: () => this.panCapture,
    onPanResponderGrant: (evt, gestureState) => this.onGrantBlock(evt, gestureState),
    onPanResponderMove: (evt, gestureState) => this.onMoveBlock(evt, gestureState),
    onPanResponderRelease: (evt, gestureState) => this.onReleaseBlock(evt, gestureState),
  });

  constructor() {
    super();
  }

  UNSAFE_componentWillUpdate = ({ itemOrder, children, itemsPerRow, blockHeight }) => {
    console.log('will update');
    this.itemOrder = cloneDeep(itemOrder);
    this.gridHeight = blockHeight * Math.ceil(children.length / itemsPerRow);

    const oldBlockPositions = Object.keys(this.blockPositions);
    oldBlockPositions.forEach(key => {
      !children.find(child => child.key == key) && delete this.blockPositions[key];
    });

    const filteredOrder = Object.values(this.itemOrder).filter(({ key }) =>
      children.find(child => child.key == key),
    );
    const sortedOrder = sortBy(filteredOrder, ({ order }) => order);

    sortedOrder.forEach(({ key }, index) => {
      const x = (index % itemsPerRow) * this.blockWidth;
      const y = Math.floor(index / itemsPerRow) * blockHeight;

      //console.log(this.blockPositions[key]);
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
    // this.forceUpdate();
  };

  onGrantBlock = (evt, gestureState) => {
    const activeBlockPosition = this.getActiveBlock().origin;
    const x = activeBlockPosition.x - gestureState.x0;
    const y = activeBlockPosition.y - gestureState.y0;
    this.activeBlockOffset = { x, y };
    this.getActiveBlock().currentPosition.setOffset({ x, y });
    this.getActiveBlock().currentPosition.setValue({
      x: gestureState.moveX,
      y: gestureState.moveY,
    });
  };

  onMoveBlock = (evt, { moveX, moveY }) => {
    this.dragPosition = { x: moveX, y: moveY };
    this.getActiveBlock().currentPosition.setValue(this.dragPosition);

    const originalPosition = this.getActiveBlock().origin;
    const distanceToOrigin = this.getDistanceTo(originalPosition);

    let closest = this.activeBlock;
    let closestDistance = distanceToOrigin;
    for (let key in this.blockPositions) {
      const block = this.blockPositions[key];
      if (key !== this.activeBlock && block.origin) {
        const blockPosition = block.origin;
        const distance = this.getDistanceTo(blockPosition);

        if (distance < closestDistance && distance < this.blockWidth) {
          closest = key;
          closestDistance = distance;
        }
      }
    }

    if (closest !== this.activeBlock) {
      const activeBlock = this.getActiveBlock();
      const closestBlock = this.getBlock(closest);
      animateTiming(closestBlock.currentPosition, activeBlock.origin);

      //swap block positions
      activeBlock.origin = closestBlock.origin;
      closestBlock.origin = originalPosition;

      //swap item orders
      const tempOrder = this.itemOrder[this.activeBlock].order;
      this.itemOrder[this.activeBlock].order = this.itemOrder[closest].order;
      this.itemOrder[closest].order = tempOrder;
    }
  };

  onReleaseBlock = () => {
    const activeBlock = this.getActiveBlock();
    activeBlock.currentPosition.flattenOffset();
    animateTiming(activeBlock.currentPosition, activeBlock.origin);
    this.deactivateDrag();
  };

  deactivateDrag = () => {
    this.panCapture = false;
    this.props.onDragRelease({ itemOrder: this.itemOrder });
    this.activeBlock = null;
    this.forceUpdate();
  };

  activateDrag = key => () => {
    this.panCapture = true;
    this.activeBlock = key;
    this.forceUpdate();
  };

  // Helpers & other boring stuff

  getActiveBlock = () => this.blockPositions[this.activeBlock];

  getBlock = key => this.blockPositions[key];

  blockPositionsSet = () => Object.keys(this.blockPositions).length === this.props.children.length;

  getDistanceTo = point => {
    const xDistance = this.dragPosition.x + this.activeBlockOffset.x - point.x;
    const yDistance = this.dragPosition.y + this.activeBlockOffset.y - point.y;
    return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
  };

  onGridLayout = ({ nativeEvent }) => {
    console.log('grid layout');
    this.blockWidth = nativeEvent.layout.width / this.props.itemsPerRow;
    this.forceUpdate();
  };

  // Style getters

  getGridStyle = () => ({ ...styles.sortableGrid, height: this.gridHeight });

  getBlockStyle = key => ({
    width: this.blockWidth,
    height: this.props.blockHeight,
    justifyContent: 'center',
    position: 'absolute',
    transform: this.blockPositionsSet()
      ? this.getBlock(key).currentPosition.getTranslateTransform()
      : [],
    zIndex: this.activeBlock == key ? 1 : 0,
  });

  renderEntry = item => (
    <Animated.View
      key={item.key}
      style={this.getBlockStyle(item.key)}
      {...this.panResponder.panHandlers}
    >
      <TouchableWithoutFeedback
        style={styles.container}
        delayLongPress={this.props.dragActivationTreshold}
        onLongPress={item.inactive ? noop : this.activateDrag(item.key)}
      >
        <View style={styles.itemImageContainer}>
          <View style={styles.container}>{item}</View>
        </View>
      </TouchableWithoutFeedback>
    </Animated.View>
  );

  render = () => (
    <ScrollView removeClippedSubviews scrollEnabled={false} canCancelContentTouches={false}>
      <Animated.View style={this.getGridStyle()} onLayout={this.onGridLayout}>
        {this.props.children.map(this.renderEntry)}
      </Animated.View>
    </ScrollView>
  );
}

export default SortableGrid;
