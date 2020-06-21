import React, { PureComponent } from 'react';
import { StyleSheet, Animated, TouchableWithoutFeedback, PanResponder, View } from 'react-native';
import { sortBy, cloneDeep } from 'lodash';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sortableGrid: {
    backgroundColor: 'green',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  itemImageContainer: {
    flex: 1,
    justifyContent: 'center',
  },
});

class SortableGrid extends PureComponent {
  blockTransitionDuration = 300;
  activeBlockCenteringDuration = 200;
  itemsPerRow = 4;
  dragActivationTreshold = 200;

  rows = null;
  dragPosition = null;
  activeBlockOffset = null;
  blockWidth = null;
  blockHeight = null;
  itemOrder = {};
  panCapture = false;
  gridHeight = null;
  startDragWiggle = new Animated.Value(0);

  _panResponder = PanResponder.create({
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

  componentDidMount = () => this._assignReceivedPropertiesIntoThis(this.props);

  UNSAFE_componentWillReceiveProps = properties => {
    this._assignReceivedPropertiesIntoThis(properties);
    if (properties.children.length < Object.keys(this.state.blockPositions).length) {
      const oldBlockPositions = Object.keys(this.state.blockPositions);
      oldBlockPositions.forEach(key => {
        if (!properties.children.find(child => child.key === key)) {
          delete this.state.blockPositions[key];
        }
      });
      this.state.blockPositionsSetCount = properties.children.length;

      const oldRows = this.rows;
      this.rows = Math.ceil(properties.children.length / this.itemsPerRow);
      if (this.blockWidth && oldRows !== this.rows) {
        this.gridHeight = this.rows * this.props.blockHeight;
      }

      const sortedOrder = sortBy(this.itemOrder, ({ key, order }) => order);
      const flattenedOrder = sortedOrder.map((item, index) => ({ ...item, order: index }));
      flattenedOrder.forEach(({ key, order }) => {
        const x = (order * this.blockWidth) % (this.itemsPerRow * this.blockWidth);
        const y = Math.floor(order / this.itemsPerRow) * this.props.blockHeight;
        this.state.blockPositions[key].origin = { x, y };
        this._getBlock(key).currentPosition.setValue({ x, y });
      });
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

  onMoveBlock = (evt, { moveX, moveY, dx, dy }) => {
    const dragPosition = { x: moveX, y: moveY };
    this.dragPosition = dragPosition;

    const originalPosition = this._getActiveBlock().origin;
    const distanceToOrigin = this._getDistanceTo(originalPosition);
    this._getActiveBlock().currentPosition.setValue(dragPosition);

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
      /*Animated.timing(this._getBlock(closest).currentPosition, {
        toValue: this._getActiveBlock().origin,
        duration: this.blockTransitionDuration,
        useNativeDriver: true,
      }).start();*/
      this._getBlock(closest).currentPosition.setValue(this._getActiveBlock().origin);
      const blockPositions = this.state.blockPositions;
      this._getActiveBlock().origin = blockPositions[closest].origin;
      blockPositions[closest].origin = originalPosition;
      this.setState({ blockPositions });

      const tempOrder = this.itemOrder[this.state.activeBlock].order;
      this.itemOrder[this.state.activeBlock].order = this.itemOrder[closest].order;
      this.itemOrder[closest].order = tempOrder;
    }
  };

  onReleaseBlock = (evt, gestureState) => {
    const activeBlock = this._getActiveBlock();
    activeBlock.currentPosition.flattenOffset();
    activeBlock.currentPosition.setValue(activeBlock.origin);
    /*Animated.timing(activeBlock.currentPosition, {
      toValue: activeBlock.origin,
      duration: this.activeBlockCenteringDuration,
      useNativeDriver: true,
    });*/
    this.props.onDragRelease && this.props.onDragRelease({ itemOrder: this.itemOrder });
    this.setState({ activeBlock: null });
    this.panCapture = false;
  };

  saveBlockPositions = key => ({ nativeEvent }) => {
    const blockPositions = this.state.blockPositions;
    if (!blockPositions[key]) {
      const blockPositionsSetCount = blockPositions[key]
        ? this.state.blockPositionsSetCount
        : ++this.state.blockPositionsSetCount;
      const thisPosition = {
        x: nativeEvent.layout.x,
        y: nativeEvent.layout.y,
      };

      blockPositions[key] = {
        currentPosition: new Animated.ValueXY(thisPosition),
        origin: thisPosition,
      };
      this.setState({ blockPositions, blockPositionsSetCount });

      if (this._blockPositionsSet()) {
        const oldRows = this.rows;
        this.rows = Math.ceil(this.props.children.length / this.itemsPerRow);
        if (this.blockWidth && oldRows !== this.rows) {
          this.gridHeight = this.rows * this.props.blockHeight;
        }
      }
    }
  };

  activateDrag = key => () => {
    this.panCapture = true;
    this.props.onDragStart && this.props.onDragStart(this.itemOrder[key]);
    this.setState({ activeBlock: key });
    this.startDragWiggle.setValue(20);
    Animated.spring(this.startDragWiggle, {
      toValue: 0,
      velocity: 1000,
      tension: 1000,
      friction: 5,
      useNativeDriver: true,
    }).start();
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

  _assignReceivedPropertiesIntoThis = properties => {
    Object.keys(properties).forEach(property => {
      if (this[property]) {
        this[property] = properties[property];
      }
    });
    this.itemOrder = cloneDeep(properties.itemOrder);
  };

  // Style getters

  _getGridStyle = () => [
    styles.sortableGrid,
    this.props.style,
    this._blockPositionsSet() && { height: this.gridHeight },
  ];

  _getBlockStyle = (key, blockHeight) => [
    {
      width: this.state.blockWidth,
      height: blockHeight,
      justifyContent: 'center',
    },
    this.state.activeBlock == key && {
      transform: [
        {
          rotate: this.startDragWiggle.interpolate({
            inputRange: [0, 360],
            outputRange: ['0 deg', '360 deg'],
          }),
        },
      ],
    },
    this._blockPositionsSet() && {
      position: 'absolute',
      transform: this._getBlock(key).currentPosition.getTranslateTransform(),
      //top: this._getBlock(key).currentPosition.getLayout().top,
      //left: this._getBlock(key).currentPosition.getLayout().left,
    },
    this.state.activeBlock == key && { zIndex: 1 },
  ];

  onLayout = ({ nativeEvent }) => {
    this.blockWidth = nativeEvent.layout.width / this.itemsPerRow;
    if (this.state.gridLayout != nativeEvent.layout) {
      this.setState({
        gridLayout: nativeEvent.layout,
        blockWidth: this.blockWidth,
        blockHeight: this.props.blockHeight,
      });
    }
  };

  render = () => (
    <Animated.View style={this._getGridStyle()} onLayout={this.onLayout}>
      {this.state.gridLayout &&
        sortBy(this.props.children, ({ key }) => this.props.itemOrder[key].order).map(item => {
          const key = item.key;
          return (
            <Animated.View
              key={key}
              style={this._getBlockStyle(key, this.props.blockHeight)}
              onLayout={this.saveBlockPositions(key)}
              {...this._panResponder.panHandlers}
            >
              <TouchableWithoutFeedback
                style={styles.container}
                delayLongPress={this.dragActivationTreshold}
                onLongPress={this.activateDrag(key)}
              >
                <View style={styles.itemImageContainer}>
                  <View style={styles.container}>{item}</View>
                </View>
              </TouchableWithoutFeedback>
            </Animated.View>
          );
        })}
    </Animated.View>
  );
}

export { SortableGrid };
