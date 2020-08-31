import React from 'react';
import { PrivateRoute } from '../../routers/PrivateRoute';
import { MemoryRouter } from 'react-router-dom';
const { shallow, mount } = require("enzyme")

describe('Pruebas en <PrivateRoute />', () => {
    const props = {
        location: {
            pathname: '/marvel'
        }
    }

    Storage.prototype.setItem = jest.fn();

    test('debe de mostrar el componente si está autenticado y guardar localStorage', () => {
        
        const wrapper = mount(
            <MemoryRouter>
            <PrivateRoute 
                isAuthenticated={true}
                component={()=> <span>Componente</span>}
                {...props}/>
            </MemoryRouter>
        );
        // console.log(wrapper.html());
        const args = ['lastPath','/marvel']
        expect(wrapper.find('span').exists()).toBe(true)
        expect(localStorage.setItem).toHaveBeenCalledWith(args[0],args[1])
    })
    test('debe de bloquear el componente si no está autenticado', () => {
        const wrapper = mount(
            <MemoryRouter>
                <PrivateRoute 
                    isAuthenticated={false}
                    component={() => <span>Test</span>}
                    {...props}/>
            </MemoryRouter>
        )
        expect(wrapper.find('span').exists()).toBe(false)
    })
    
    
})
