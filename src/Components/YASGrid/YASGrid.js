/* eslint-disable eqeqeq */
import React, { PureComponent } from 'react';
import {
  StyleSheet,
  Animated,
  TouchableWithoutFeedback,
  PanResponder,
  View,
  ScrollView,
} from 'react-native';
import { sortBy, cloneDeep } from 'lodash';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sortableGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: 'green',
  },
  itemImageContainer: {
    flex: 1,
    justifyContent: 'center',
  },
});

export class SortableGrid extends PureComponent {
  rows = null;
  dragPosition = null;
  activeBlockOffset = null;
  blockWidth = null;
  itemOrder = {};
  panCapture = false;
  gridHeight = null;

  panResponder = PanResponder.create({
    onStartShouldSetPanResponderCapture: () => false,
    onMoveShouldSetPanResponder: () => this.panCapture,
    onMoveShouldSetPanResponderCapture: () => this.panCapture,
    onPanResponderGrant: (evt, gestureState) => this.onStartDrag(evt, gestureState),
    onPanResponderMove: (evt, gestureState) => this.onMoveBlock(evt, gestureState),
    onPanResponderRelease: (evt, gestureState) => this.onReleaseBlock(evt, gestureState),
  });

  state = {
    gridLayout: null,
    blockPositions: {},
    activeBlock: null,
    blockPositionsSetCount: 0,
  };

  constructor() {
    super();
  }

  componentDidMount = () => {
    this.itemOrder = cloneDeep(this.props.itemOrder);
  };

  UNSAFE_componentWillReceiveProps = properties => {
    this.itemOrder = cloneDeep(properties.itemOrder);
    this.blockWidth = (this.blockWidth * this.props.itemsPerRow) / properties.itemsPerRow;

    if (properties.children.length < Object.keys(this.state.blockPositions).length) {
      const oldBlockPositions = Object.keys(this.state.blockPositions);
      oldBlockPositions.forEach(key => {
        if (!properties.children.find(child => child.key === key)) {
          delete this.state.blockPositions[key];
        }
      });
      this.state.blockPositionsSetCount = properties.children.length;
    }

    const oldRows = this.rows;
    this.rows = Math.ceil(properties.children.length / properties.itemsPerRow);
    if (this.blockWidth && oldRows !== this.rows) {
      this.gridHeight = this.rows * properties.blockHeight;
    }

    const filteredOrder = Object.values(this.itemOrder).filter(({ key }) =>
      properties.children.find(child => child.key == key),
    );
    const sortedOrder = sortBy(filteredOrder, ({ order }) => order);

    sortedOrder.forEach(({ key }, index) => {
      const x = (index % properties.itemsPerRow) * this.blockWidth;
      const y = Math.floor(index / properties.itemsPerRow) * properties.blockHeight;
      this.state.blockPositions[key].origin = { x, y };
      this._getBlock(key).currentPosition.setValue({ x, y });
    });
  };

  saveBlockPositions = key => ({ nativeEvent }) => {
    const blockPositions = this.state.blockPositions;
    if (!blockPositions[key]) {
      this.state.blockPositionsSetCount += 1;
      const thisPosition = {
        x: nativeEvent.layout.x,
        y: nativeEvent.layout.y,
      };

      blockPositions[key] = {
        currentPosition: new Animated.ValueXY(thisPosition),
        origin: thisPosition,
      };

      if (this._blockPositionsSet()) {
        const oldRows = this.rows;
        this.rows = Math.ceil(this.props.children.length / this.props.itemsPerRow);
        if (this.blockWidth && oldRows !== this.rows) {
          this.gridHeight = this.rows * this.props.blockHeight;
        }
      }
    }
  };

  onMoveBlock = (evt, { moveX, moveY }) => {
    this.dragPosition = { x: moveX, y: moveY };
    this._getActiveBlock().currentPosition.setValue(this.dragPosition);

    const originalPosition = this._getActiveBlock().origin;
    const distanceToOrigin = this._getDistanceTo(originalPosition);

    let closest = this.state.activeBlock;
    let closestDistance = distanceToOrigin;
    for (let key in this.state.blockPositions) {
      const block = this.state.blockPositions[key];
      if (key !== this.state.activeBlock && block.origin) {
        const blockPosition = block.origin;
        const distance = this._getDistanceTo(blockPosition);

        if (distance < closestDistance && distance < this.blockWidth) {
          closest = key;
          closestDistance = distance;
        }
      }
    }

    if (closest !== this.state.activeBlock) {
      const activeBlock = this._getActiveBlock();
      const closestBlock = this._getBlock(closest);
      Animated.timing(closestBlock.currentPosition, {
        toValue: activeBlock.origin,
        duration: this.props.blockTransitionDuration,
        useNativeDriver: false,
      }).start();

      //swap block positions
      activeBlock.origin = closestBlock.origin;
      closestBlock.origin = originalPosition;

      //swap item orders
      const tempOrder = this.itemOrder[this.state.activeBlock].order;
      this.itemOrder[this.state.activeBlock].order = this.itemOrder[closest].order;
      this.itemOrder[closest].order = tempOrder;
    }
  };

  onStartDrag = (evt, gestureState) => {
    const activeBlockPosition = this._getActiveBlock().origin;
    const x = activeBlockPosition.x - gestureState.x0;
    const y = activeBlockPosition.y - gestureState.y0;
    this.activeBlockOffset = { x, y };
    this._getActiveBlock().currentPosition.setOffset({ x, y });
    this._getActiveBlock().currentPosition.setValue({
      x: gestureState.moveX,
      y: gestureState.moveY,
    });
  };

  onReleaseBlock = (evt, gestureState) => {
    const activeBlock = this._getActiveBlock();
    activeBlock.currentPosition.flattenOffset();
    Animated.timing(activeBlock.currentPosition, {
      toValue: activeBlock.origin,
      duration: this.props.activeBlockCenteringDuration,
      useNativeDriver: false,
    }).start();

    this.deactivateDrag();
  };

  deactivateDrag = () => {
    this.panCapture = false;
    this.props.onDragRelease({ itemOrder: this.itemOrder });
    this.setState({ activeBlock: null });
  };

  activateDrag = key => () => {
    this.panCapture = true;
    this.setState({ activeBlock: key });
  };

  // Helpers & other boring stuff

  _getActiveBlock = () => this.state.blockPositions[this.state.activeBlock];

  _getBlock = key => this.state.blockPositions[key];

  _blockPositionsSet = () => this.state.blockPositionsSetCount === this.props.children.length;

  _getDistanceTo = point => {
    const xDistance = this.dragPosition.x + this.activeBlockOffset.x - point.x;
    const yDistance = this.dragPosition.y + this.activeBlockOffset.y - point.y;
    return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
  };

  // Style getters

  _getGridStyle = () => [
    styles.sortableGrid,
    this.props.style,
    this._blockPositionsSet() && { height: this.gridHeight },
  ];

  _getBlockStyle = (key, blockHeight) => [
    {
      width: this.blockWidth - 1,
      height: blockHeight,
      justifyContent: 'center',
    },
    this._blockPositionsSet() && {
      position: 'absolute',
      transform: this._getBlock(key).currentPosition.getTranslateTransform(),
    },
    this.state.activeBlock == key && { zIndex: 1 },
  ];

  onLayout = ({ nativeEvent }) => {
    this.blockWidth = nativeEvent.layout.width / this.props.itemsPerRow;
    if (this.state.gridLayout != nativeEvent.layout) {
      this.setState({ gridLayout: nativeEvent.layout });
    }
  };

  render = () => {
    const items = sortBy(this.props.children, ({ key }) => this.props.itemOrder[key].order);
    return (
      <ScrollView removeClippedSubviews scrollEnabled={false} canCancelContentTouches={false}>
        <Animated.View style={this._getGridStyle()} onLayout={this.onLayout}>
          {this.state.gridLayout &&
            items.map(item => {
              const key = item.key;
              const { inactive } = item.props;
              return (
                <Animated.View
                  key={key}
                  style={this._getBlockStyle(key, this.props.blockHeight)}
                  onLayout={this.saveBlockPositions(key)}
                  {...this.panResponder.panHandlers}
                >
                  <TouchableWithoutFeedback
                    style={styles.container}
                    delayLongPress={this.props.dragActivationTreshold}
                    onLongPress={inactive || this.activateDrag(key)}
                  >
                    <View style={styles.itemImageContainer}>
                      <View style={styles.container}>{item}</View>
                    </View>
                  </TouchableWithoutFeedback>
                </Animated.View>
              );
            })}
        </Animated.View>
      </ScrollView>
    );
  };
}

export default SortableGrid;
