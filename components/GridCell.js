import React from 'react';
import { View, Dimensions } from 'react-native';

const { width: screenWidth } = Dimensions.get('window');
const MARGIN_WIDTH = 4;
const ITEM_WIDTH = (screenWidth - 40 - MARGIN_WIDTH * 10) / 4;

const GridCell = () => <View style={styles.container} />;
const styles = {
  container: {
    width: ITEM_WIDTH,
    height: ITEM_WIDTH,
    marginHorizontal: MARGIN_WIDTH,
    backgroundColor: 'rgba(238, 228, 218, 0.35)',
    borderRadius: 5
  }
};
export default GridCell;
