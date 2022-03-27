import React from 'react';
import {MenuBarre} from './../Menu/Menu.js'
import {useSelector} from 'react-redux';

export const Home =(props) =>{

  let user = useSelector(state => state.userReducer.current_user);
  
  return (
    <div>
    <MenuBarre>
    </MenuBarre>
    <div class="ui clearing segment">
      <h3 class="ui right floated header">
          <i class="user circle outline icon"></i>
          <div class="content">
              <span id="userNameId">{user.surName+" "+user.lastName}</span>
              <div class="sub header"><span>{user.account}</span>$</div>
          </div>
      </h3>
    </div>
    </div>
  );
}
export default Home;