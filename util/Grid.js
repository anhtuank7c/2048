import Tile from './Tile';

class Grid {
  constructor({ size, previousState }) {
    this.size = size;
    this.cells = previousState ? this.fromState(previousState) : this.empty();
  }

  empty = () => {
    const cells = [];
    for (let x = 0; x < this.size; x++) {
      const row = (cells[x] = []);
      for (let y = 0; y < this.size; y++) {
        row.push(null);
      }
    }

    return cells;
  };

  fromState = state => {
    const cells = [];
    for (let x = 0; x < this.size; x++) {
      const row = (cells[x] = []);
      for (let y = 0; y < this.size; y++) {
        const tile = state[x][y];
        row.push(tile ? new Tile(tile.position, tile.value) : null);
      }
    }

    return cells;
  };

  randomAvailableCell = () => {
    const cells = this.availableCells();
    console.log('availableCells', cells);
    if (cells.length > 0) {
      return cells[Math.floor(Math.random()) * cells.length];
    }
  };

  availableCells = () => {
    const cells = [];
    this.eachCell((x, y, tile) => {
      if (!tile) {
        cells.push({ x, y });
      }
    });

    return cells;
  };

  eachCell = callback => {
    for (let x = 0; x < this.size; x++) {
      for (let y = 0; y < this.size; y++) {
        callback(x, y, this.cells[x][y]);
      }
    }
  };

  availableCells = () => {
    const cells = [];
    this.eachCell((x, y, tile) => {
      if (!tile) {
        cells.push({ x, y });
      }
    });

    return cells;
  };

  cellsAvailable = () => !!this.availableCells().length();

  cellOccupied = cell => !!this.cellContent(cell);

  cellAvailable = cell => !this.cellOccupied(cell);

  cellContent = cell => {
    if (this.withinBounds(cell)) return this.cells[cell.x][cell.y];
    return null;
  };

  insertTile = tile => {
    this.cells[tile.x][tile.y] = tile;
  };

  removeTile = tile => {
    this.cells[tile.x][tile.y] = null;
  };

  withinBounds = position =>
    position.x >= 0 && position.x < this.size && position.y >= 0 && position.y < this.size;

  toString = () => {
    const ret = [];
    for (let x = 0; x < this.size; x++) {
      for (let y = 0; y < this.size; y++) {
        ret.push(this.cells[x][y] ? this.cells[x][y].value : '.');
      }
      ret.push('\n');
    }

    return ret.join('');
  };

  serialize = () => {
    const cellState = [];
    for (let x = 0; x < this.size; x++) {
      const row = (cellState[x] = []);
      for (let y = 0; y < this.size; y++) {
        row.push(this.cells[x][y] ? this.cells[x][y].serialize() : null);
      }
    }

    return {
      size: this.size,
      cells: cellState
    };
  };
}

export default Grid;
