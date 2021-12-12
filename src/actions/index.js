export const updateUser =
    (user) => {
                return { 
                        type: 'UPDATE_USER_ACTION', 
                        user: user 
                       };
              }

export const submitUser =
    (user) => {
                return { 
                        type: 'SUBMIT_USER_ACTION', 
                        user: user 
                       };
              }
export const setSelectedRobot=(robot_obj)=>{
                return {
                    type: 'UPDATE_SELECTED_ROBOT',
                    obj:robot_obj
                    
                };
            }
            
            
export const setSelectedPart=(part_obj)=>{
                return {
                    type: 'UPDATE_SELECTED_PART',
                    obj:part_obj
                };
            }