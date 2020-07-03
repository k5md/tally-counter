/* eslint-disable eqeqeq */
import React, { Component, PureComponent } from 'react';
import { Animated, TouchableWithoutFeedback, PanResponder, View, ScrollView } from 'react-native';
import { sortBy, cloneDeep, omit, noop } from 'lodash';
import { styles } from './styles';
import { animateTiming } from './utils';
import { SortableGridDefaultProps, SortableGridPropTypes } from './types';

export class SortableGrid extends PureComponent {
  itemOrder = {};
  blockPositions = {};
  activeBlock = null;
  blockPositionsSetCount = 0;
  gridHeight = 0;
  blockWidth = 0;
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
    const y = activeBlockPosition.y - gestureState.y0;
    this.activeBlockOffset = { x, y };
    this.getActiveBlock().currentPosition.setOffset({ x, y });
    this.getActiveBlock().currentPosition.setValue({
      x: gestureState.moveX,
      y: gestureState.moveY,
    });
  };

  onMoveBlock = (evt, gestureState) => {
    this.dragPosition = { x: gestureState.moveX, y: gestureState.moveY };
    const activeBlock = this.getActiveBlock();
    activeBlock.currentPosition.setValue(this.dragPosition);

    const originalPosition = activeBlock.origin;

    let closest = this.activeBlock;
    let closestDistance = this.getDistanceTo(originalPosition);
    for (let key in this.blockPositions) {
      const block = this.blockPositions[key];
      const blockPosition = block.origin;
      const distance = this.getDistanceTo(blockPosition);
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
    const activeBlock = this.getActiveBlock();
    activeBlock.currentPosition.flattenOffset();
    animateTiming(activeBlock.currentPosition, activeBlock.origin);
    this.deactivateDrag();
  };

  deactivateDrag = () => {
    this.panCapture = false;
    this.props.onDragRelease({
      itemOrder: sortBy(Object.values(this.itemOrder), item => item.order).map(item => item.key),
    });
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

  getDistanceTo = point => {
    const xDistance = this.dragPosition.x + this.activeBlockOffset.x - point.x;
    const yDistance = this.dragPosition.y + this.activeBlockOffset.y - point.y;
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

SortableGrid.propTypes = SortableGridPropTypes;
SortableGrid.defaultProps = SortableGridDefaultProps;

export default SortableGrid;
