import React from 'react';
import { mount } from 'enzyme';
import { LoginScreen } from '../../../components/login/LoginScreen';
import { AuthContext } from '../../../auth/AuthContext';
import { types } from '../../../types/types';

describe('Pruebas en <LoginScreen />', () => {

    const contextValue = {
        dispatch: jest.fn(),
        user: {
            logged: false
        }
    }
    const history = {
        replace : jest.fn()
    }

    const wrapper = mount(
        <AuthContext.Provider value={contextValue}>
            <LoginScreen history={history}/>
        </AuthContext.Provider>
    )

    test('debe de mostrarse correctamente', () => {
        const wrapper = mount(
            <AuthContext.Provider value={contextValue}>
            <LoginScreen history={history}/>
            </AuthContext.Provider>
        )
        expect(wrapper).toMatchSnapshot();
    })
    test('debe de realizar el dispatch y la navegación', () => {
        
        const action = {
            type:types.login,
            payload: {
                name: 'Gianluca'
            }
        }
    
       
        const handleClick = wrapper.find('button').prop('onClick');

        handleClick();
       
        expect(contextValue.dispatch).toHaveBeenCalledWith(action)
        expect(history.replace).toHaveBeenCalledWith('/');
        localStorage.setItem('lastPath','/dc');
        handleClick();
        expect(history.replace).toHaveBeenCalledWith('/dc');
        
    })
    
    
})
