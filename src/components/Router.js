import { BrowserRouter as Router, Route , Routes} from "react-router-dom";
import Home from './Home/Home.js';
import Market from './Market/containers/Market.js'
import { SignUpForm } from "./userform/SignupForm.js";
import { SignInForm } from "./userform/SigninForm.js";
import {useSelector} from 'react-redux';
import Chat from "./Game/Chat.js";
import Preparation from "./Game/Preparation.js";
import Game from "./Game/Game.js"

export const MainRouter =() =>{
    let user = useSelector(state => state.userReducer.current_user)
    if(user.id) {
        var user_connected=true;
    } else {
        var user_connected=false;
    }
    return (
        <Router>
        <Routes>
        { user_connected &&
            <Route path="*" element={<Home/>}/>
        }
        { !user_connected &&
            <Route path="*" element={<SignUpForm/>}/>
        }
        { user_connected &&
            <Route path="/buy" element={<Market type="Achat"/>}/>
        }
        { user_connected &&
            <Route path="/sell" element={<Market type="Vente"/>}/>
        }
        { user_connected &&
            <Route path="/play" element={<Preparation/>}/>
        }
        { user_connected &&
            <Route path="/chat" element={<Chat/>}/>
        }
        { user_connected &&
            <Route path="/arena" element={<Game/>}/>
        }
        <Route path="/signup" element={<SignUpForm/>}/>
        <Route path="/login" element={<SignInForm/>}/>
        </Routes>
        </Router>
    )

  }

  export default MainRouter;