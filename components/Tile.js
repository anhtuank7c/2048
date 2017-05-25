import React from 'react';
import { View, Dimensions } from 'react-native';
import TileCell from './TileCell';

const { width: screenWidth } = Dimensions.get('window');
const Tile = props => {
  const chilren = props.tiles;
  console.log('chilren', chilren);
  return (
    <View style={styles.container}>
      {chilren.map(tile => <TileCell x={tile.x} y={tile.y} value={tile.value} key={tile.prog} />)}
    </View>
  );
};

const styles = {
  container: {
    width: screenWidth - 20,
    height: screenWidth - 20,
    position: 'absolute',
    left: 0,
    top: 0,
    overflow: 'hidden'
  }
};
export default Tile;
