import React, { Component } from 'react';
import { View, Dimensions } from 'react-native';
import GridRow from './GridRow';

const { width: screenWidth } = Dimensions.get('window');
class Grid extends Component {
  render() {
    return (
      <View style={styles.container}>
        <GridRow />
        <GridRow />
        <GridRow />
        <GridRow />
      </View>
    );
  }
}
const styles = {
  container: {
    width: screenWidth - 20,
    height: screenWidth - 20,
    position: 'absolute',
    left: 0,
    top: 0,
    overflow: 'hidden',
    paddingHorizontal: 4,
    paddingVertical: 4,
    flexDirection: 'column'
  }
};
export default Grid;
