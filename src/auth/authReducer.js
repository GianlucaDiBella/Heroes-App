import { types } from "../types/types";

export const authReducer = ( state = {}, action) => {
    
    // const state = {
    //     name: 'Gianluca',
    //     logged: true
    // }
    
    
    switch (action.type) {

        case types.login :
            return {
               ...action.payload,
               logged: true
            }    
            
        case types.logout:
            return {
                logged: false
            }

        default:
            return state;
    }
}