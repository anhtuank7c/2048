import { AsyncStorage } from 'react-native';

class Storage {
  constructor() {
    this.bestScoreKey = 'bestScore';
    this.gameStateKey = 'gameState';
    this.storage = AsyncStorage;
  }

  getItem = options => {
    AsyncStorage.getItem(options.key, (error, result) => {
      if (error) options.error(error);
      else options.success(result);
    });
  };

  setItem = options => {
    AsyncStorage.setItem(options.key, options.value, (error, result) => {
      if (error) options.error(error);
      else options.success(result);
    });
  };

  removeItem = options => {
    AsyncStorage.removeItem(options.key, (error, result) => {
      if (error) options.error(error);
      else options.success(result);
    });
  };

  getBestScore = callback => {
    callback = callback || function () {};
    this.getItem({
      key: this.bestScoreKey,
      success: result => {
        callback(result && !isNaN(result) ? parseInt(result) : 0);
      },
      error: error => console.log(error)
    });
  };

  setBestScore = (score, callback) => {
    callback = callback || function () {};
    this.setItem({
      key: this.bestScoreKey,
      value: score.toString(),
      success: callback,
      error: error => console.log(error)
    });
  };

  getGameState = callback => {
    callback = callback || function () {};
    return this.getItem({
      key: this.gameStateKey,
      success: result => {
        const state = result ? JSON.parse(result) : null;
        callback(state);
      },
      error: error => console.log(error)
    });
  };

  setGameState = (gameState, callback) => {
    callback = callback || function () {};
    this.setItem({
      key: this.gameStateKey,
      value: gameState ? JSON.stringify(gameState) : null,
      success: callback,
      error: error => console.log(error)
    });
  };

  clearGameState = callback => {
    callback = callback || function () {};
    this.removeItem({
      key: this.gameStateKey,
      success: callback,
      error: error => console.log(error)
    });
  };
}

export default Storage;
