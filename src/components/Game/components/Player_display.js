
import {React} from 'react';
import {Progress} from 'semantic-ui-react';

export const Player_display =(props) =>{
    const data =
        {
            "name" : props.name,
            "hp" : props.hp
        }

    return (
        <div class="two wide column">
            <div class="ui one  column centered grid">    
                <div class="row">                   
                    <div class="column"> <i class="user circle huge icon "></i></div>
                </div>
                <div class="row">
                    <div class=" column">{data.name}</div>      
                </div>                          
                <div class="row">
                    <div class="column">
                        <Progress percent={data.hp} total="100" indicating>
                        Energy : {data.hp}
                        </Progress>
                    </div>
                </div>
            </div>
        </div>
    )

}
export default Player_display; 