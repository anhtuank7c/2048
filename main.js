import Expo from 'expo';
import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  NativeModules,
  Dimensions,
  PanResponder,
  LayoutAnimation
} from 'react-native';
import styles from './styles';
import Grid from './util/Grid';
import Tile from './util/Tile';
import Storage from './util/Storage';
import Board from './components/Board';

const { UIManager } = NativeModules;
const { width, height } = Dimensions.get('window');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tiles: [],
      score: 0,
      over: false,
      win: false,
      keepPlaying: false,
      grid: new Grid(4),
      size: 4
    };
    this.storage = new Storage();
    this.keepGoing = this.keepGoing.bind(this);
    this.restart = this.restart.bind(this);
    this.startTiles = 2;
    this.size = 4;
  }

  componentWillMount() {
    this.setup();
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (event, gestureState) => true,
      onMoveShouldSetPanResponder: (event, gestureState) => true,
      onPanResponderGrant: this._handlePanResponderGrant.bind(this),
      onPanResponderMove: (event, gestureState) => true,
      onPanResponderEnd: this._handlePanResponderEnd.bind(this)
    });
    this.moving = false;
    UIManager.setLayoutAnimationEnabledExperimental &&
      UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  _handlePanResponderGrant = (event, gestureState) => {
    if (!this.moving) {
      this.moving = true;
    }
  };

  _handlePanResponderEnd = (event, gestureState) => {
    if (this.moving) {
      this.moving = false;
      const dx = gestureState.dx;
      const dy = gestureState.dy;
      const absDx = dx > 0 ? dx : -dx;
      const absDy = dy > 0 ? dy : -dy;
      const canMove = absDx > absDy ? absDx - absDy > 10 : absDx - absDy < -10;
      if (canMove) {
        this.move(absDx > absDy ? (dx > 0 ? 1 : 3) : dy > 0 ? 2 : 0);
      }
    }
  };

  keepPlaying = () => {};

  isGameTerminated = () => this.over || (this.won && !this.keepPlaying);

  setup = () => {
    const _this = this;
    this.storage.getGameState(result => _this.setGameState(result));
  };

  move = direction => {
    if (this.isGameTerminated()) return true;
    const cell = null;
    const tile = null;
    const vector = this.getVector(direction);
    const traversals = this.buildTraversals(vector);
    const moved = false;
  };

  getVector = direction => {
    const map = {
      0: { x: 0, y: -1 }, //Up
      1: { x: 1, y: 0 }, //Right
      2: { x: 0, y: 1 }, //Down
      3: { x: 1, y: 1 } //Left
    };
    return map[direction];
  };

  buildTraversals = direction => {
    const traversal = { x: [], y: [] };
    for (let x = 0; x < this.state.size; x++) {
      traversal.x.push(x);
      traversal.y.push(x);
    }
  };

  getRandomTiles = () => {
    const ret = [];
    for (let i = 0; i < this.startTiles; i++) {
      ret.push(this.getRandomTile());
    }
    console.log('ret', ret);
    return ret;
  };

  getRandomTile = () => {
    const value = Math.floor(Math.random() * 2 + 1) % 2 === 0 ? 2 : 4;
    const pos = this.grid.randomAvailableCell();
    const tile = new Tile({ position: pos, value });
    this.grid.insertTile(tile);
    return {
      value,
      x: pos.x,
      y: pos.y,
      prog: tile.prog
    };
  };

  setGameState = previousState => {
    if (previousState) {
      // reload grid
      this.grid = new Grid({
        size: previousState.grid.size,
        previousState: previousState.grid.cells
      });
      this.score = parseInt(previousState.score);
      this.over = previousState.over === true || previousState.over === 'true';
      this.won = previousState.won === true || previousState.won === 'true';
      this.keepPlaying = previousState.keepPlaying === true || previousState.keepPlaying === 'true';
    } else {
      this.grid = new Grid({ size: this.state.size });
      this.score = 0;
      this.over = false;
      this.won = false;
      this.keepPlaying = false;
    }
    const _this = this;
    this.storage.getBestScore(result => {
      LayoutAnimation.easeInEaseOut();
      _this.setState({
        score: _this.score,
        best: result,
        tiles: _this.getRandomTiles(),
        over: _this.over,
        won: _this.won
      });
    });
  };

  render() {
    const {
      container,
      info,
      infoScore,
      logo,
      intro,
      introBold,
      infoLeft,
      infoRight,
      scoreContainer,
      infoScoreTitle,
      infoScorePoint,
      btnNewGame,
      btnNewGameTXT
    } = styles;
    return (
      <View {...this._panResponder.panHandlers} style={container}>
        <View style={info}>
          <View style={infoLeft}>
            <Text style={logo}>2048</Text>
            <Text style={intro}>
              Join the numbers and get to the <Text style={introBold}>2048 tile!</Text>
            </Text>
          </View>
          <View style={infoRight}>
            <View style={scoreContainer}>
              <View style={infoScore}>
                <Text style={infoScoreTitle}>SCORE</Text>
                <Text style={infoScorePoint}>{this.state.score}</Text>
              </View>
              <View style={infoScore}>
                <Text style={infoScoreTitle}>BEST</Text>
                <Text style={infoScorePoint}>0</Text>
              </View>
            </View>
            <TouchableOpacity style={btnNewGame}>
              <Text style={btnNewGameTXT}>New Game</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Board
          size={this.state.size}
          tiles={this.state.tiles}
          won={this.state.won}
          over={this.state.over}
          onKeepGoing={this.keepGoing}
          onTryAgain={this.restart}
        />
      </View>
    );
  }

  keepGoing = () => {};
  restart = () => {};
}

Expo.registerRootComponent(App);
