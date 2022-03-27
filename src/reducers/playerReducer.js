const playerReducer= (state={current_players_hp:{}},action) => {

    switch (action.type) {
      case 'UPDATE_PLAYERS_HP':
        return {current_players_hp:action.players_hp};
      default:
        return state;
    }
  }
    
  export default playerReducer;