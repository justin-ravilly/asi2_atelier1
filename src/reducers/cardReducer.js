const cardReducer= (state={current_cardList:{},current_selected_card:{}},action) => {

  switch (action.type) {
    case 'UPDATE_CARD_LIST':
      return {current_cardList:action.cardList};
    case 'UPDATE_SELECTED_CARD' :
      return {current_selected_card:action.card};
    default:
      return state;
  }
}
  
export default cardReducer;
  