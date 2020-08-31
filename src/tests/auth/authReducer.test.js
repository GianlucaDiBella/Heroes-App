const { authReducer } = require("../../auth/authReducer");
const { types } = require("../../types/types");

describe('Pruebas en authReducer', () => {

    test('debe de retornar el estado por defecto', () => {
        
        const state = authReducer({logged: false},{});
        expect( state ).toEqual({logged:false});
    })
    test('debe de autenticar y colocar el nombre del usuario', () => {
        const action = {
            type:types.login,
            payload: {
                name: 'Gianluca'
            }
        }
        const state = authReducer({logged:false},action )
        expect(state).toEqual({
            logged:true,
            name:'Gianluca'
        })
    })
    test('debe de borrar el name del usuario y logged en false', () => {
        const action = {
            type: types.logout
        }
        const state = authReducer({logged:true, name:'Gianluca'} , action )
        expect(state).toEqual({
            logged:false
        })
    })
    
    
})
