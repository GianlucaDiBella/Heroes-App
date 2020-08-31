import React from 'react';
import { mount } from 'enzyme';
import { DashboardRoutes } from '../../routers/DashboardRoutes';
import { MemoryRouter } from 'react-router-dom';
import { AuthContext } from '../../auth/AuthContext';
describe('Pruebas en <DashboardRoutes/>', () => {

    test('debe mostrarse correctamente', () => {
    const contextValue = {
            dispatch: jest.fn(),
            user: {
                logged: true,
                name:'Yo'
            }
        }
        const wrapper = mount(
            <MemoryRouter>
                <AuthContext.Provider value={contextValue}>
                <DashboardRoutes />
                </AuthContext.Provider>
            </MemoryRouter>
            
        )
        // console.log(wrapper.html())
        expect(wrapper.find('.navbar').exists()).toBe(true)
        expect(wrapper.find('.text-info').text().trim()).toBe('Yo')
        expect(wrapper).toMatchSnapshot();
    })
    
})
