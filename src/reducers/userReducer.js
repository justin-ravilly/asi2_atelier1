const userReducer= (state={current_user:{}},action) => {

  switch (action.type) {
    case 'UPDATE_USER_ACTION':
      return {current_user:action.user};
    default:
      return state;
  }
}

export default userReducer;
