import { Dimensions } from 'react-native';

const { width: screenWidth } = Dimensions.get('window');
export default {
  container: {
    flex: 1,
    backgroundColor: 'rgb(250, 249, 239)',
    paddingTop: 40,
    paddingRight: 20,
    paddingLeft: 20,
    paddingBottom: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  logo: {
    color: 'rgb(121,110,100)',
    fontSize: 54,
    fontWeight: '600'
  },
  intro: {
    color: 'rgb(121,110,100)',
    fontSize: 14
  },
  introBold: {
    fontWeight: 'bold'
  },
  /**
   * TOP INFO BLOCK
   */
  info: {
    flexDirection: 'row',
    flex: 1
  },
  infoLeft: {
    flex: 60
  },
  infoRight: {
    flex: 40
  },
  scoreContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    justifyContent: 'flex-end'
  },
  infoScore: {
    minWidth: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(189,173,159)',
    padding: 5,
    marginLeft: 10,
    borderRadius: 5
  },
  infoScoreTitle: {
    fontWeight: '600',
    fontSize: 10,
    color: '#fff'
  },
  infoScorePoint: {
    fontWeight: '600',
    fontSize: 20,
    color: '#fff'
  },
  btnNewGame: {
    backgroundColor: 'rgb(146, 122, 100)',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5
  },
  btnNewGameTXT: {
    color: '#fff'
  },
  /**
   * BOARD
   */
  board: {
    width: screenWidth - 40,
    height: screenWidth - 40,
    borderRadius: 5,
    backgroundColor: 'rgb(189, 173, 159)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  /**
   * SQUARE
   */
  grid: {
    backgroundColor: 'grey'
  },
  column: {},
  row: {}
};
