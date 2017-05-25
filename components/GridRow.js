import React from 'react';
import { View, Dimensions } from 'react-native';
import GridCell from './GridCell';

const { width: screenWidth } = Dimensions.get('window');
const MARGIN_WIDTH = 4;
const ITEM_WIDTH = (screenWidth - 40 - MARGIN_WIDTH * 10) / 4;

const GridRow = () => (
  <View style={styles.container}>
    <GridCell />
    <GridCell />
    <GridCell />
    <GridCell />
  </View>
);
const styles = {
  container: {
    height: ITEM_WIDTH,
    marginVertical: 4,
    flexDirection: 'row'
  }
};
export default GridRow;
