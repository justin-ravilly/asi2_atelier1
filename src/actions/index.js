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
