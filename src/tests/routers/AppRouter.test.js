import React from 'react';
import { AuthContext } from '../../auth/AuthContext';
const { mount } = require("enzyme")
const { AppRouter } = require("../../routers/AppRouter")

describe('Pruebas en <AppRouter />', () => {
    const contextValue={
        dispatch: jest.fn(),
        user: {
            logged: false
        }
    }
    test('debe de mostrar el login si no estoy autenticado', () => {
        
        const wrapper = mount(
            <AuthContext.Provider value={contextValue}>
                <AppRouter />
            </AuthContext.Provider>

        )
        // console.log(wrapper.html())
        expect(wrapper.find('h1').text().trim()).toBe('Login');
        expect(wrapper).toMatchSnapshot();
    })
    test('debde de mostrar el componente si está autenticado', () => {
        const contextValue={
            dispatch: jest.fn(),
            user: {
                logged: true,
                name: 'Yo'
            }
        }
        const wrapper = mount(
        <AuthContext.Provider value={contextValue}>
            <AppRouter />
        </AuthContext.Provider>
        )
        // console.log(wrapper.html())
        expect(wrapper.find('nav').hasClass('navbar navbar-expand-sm navbar-dark bg-dark')).toBe(true)
        expect(wrapper.find('.navbar').exists()).toBe(true)
    })
    

})
