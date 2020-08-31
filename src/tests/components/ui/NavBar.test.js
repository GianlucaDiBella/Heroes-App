import React from 'react';
import { types } from '../../../types/types';
import '@testing-library/jest-dom';
const { mount } = require("enzyme")
const { Navbar } = require("../../../components/ui/NavBar")
const { AuthContext } = require("../../../auth/AuthContext")
const { MemoryRouter, Router } = require("react-router-dom")

describe('Pruebas en <NavBar/>', () => {

    const historyMock = {
        push: jest.fn(),
        replace: jest.fn(),
        location: {},
        listen: jest.fn(),
        createHref: jest.fn(),
    }

    const contextValue = {
        dispatch: jest.fn(),
        user: {
            logged: true,
            name: 'Gianluca'
        }
        
    }
    const {user:{name:nombre}} = contextValue 
    console.log(nombre)
    const wrapper = mount(

        <AuthContext.Provider value={contextValue}>
            <MemoryRouter>
                <Router history={historyMock}>
                <Navbar />
                </Router>
            </MemoryRouter>
        </AuthContext.Provider>

    );
    afterEach(()=>{
        jest.clearAllMocks();
    });
    test('debe de mostrarse correctamente', () => {
        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('.text-info').text().trim()).toBe(nombre)
    })
    test('debe de llamar el logout y el usar history', () => {
        wrapper.find('button').prop('onClick')();

        expect( contextValue.dispatch).toHaveBeenCalledWith({
            type: types.logout
        })
        expect(historyMock.replace).toHaveBeenCalledWith('/login')
    })
    

})
