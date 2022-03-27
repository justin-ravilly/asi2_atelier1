const gameReducer= (state={current_gameData:{}},action) => {

    switch (action.type) {
      case 'UPDATE_GAME_DATA' :
        return {current_gameData:action.gameData};
      default:
        return state;
    }
  }
    
  export default gameReducer;