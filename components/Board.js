import React, { Component, PropTypes } from 'react';
import { View, Text, Dimensions } from 'react-native';
import Grid from './Grid';
import Tile from './Tile';

const { width: screenWidth } = Dimensions.get('window');
class Board extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Grid />
        <Tile tiles={this.props.tiles} />
      </View>
    );
  }
}

Board.propTypes = {
  size: PropTypes.number.isRequired,
  tiles: PropTypes.array.isRequired,
  won: PropTypes.bool,
  over: PropTypes.bool,
  onKeepGoing: PropTypes.func.isRequired,
  onTryAgain: PropTypes.func.isRequired
};
const styles = {
  container: {
    width: screenWidth - 40,
    height: screenWidth - 40,
    backgroundColor: '#bbada0',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5
  }
};
export default Board;
