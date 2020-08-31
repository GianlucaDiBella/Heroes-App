import React from 'react';
import {mount} from 'enzyme';
import { SearchScreen } from '../../../components/search/SearchScreen';
import { MemoryRouter, Route } from 'react-router-dom';

describe('Pruebas en <SearchScreen />', () => {
    test('debe de mostrarse correctamente con valores por defecto', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/search']}>
                <Route path='/search' component={SearchScreen}>
                </Route>
            </MemoryRouter>
        )        
        expect(wrapper).toMatchSnapshot()
        expect(wrapper.find('.alert-info').text().trim()).toBe('Search a hero')
    })
    test('debe de mostrar a Batman y el input con el valor del queryString', () => {
        
        const wrapper = mount(
            <MemoryRouter initialEntries={['/search?q=batman']}>
                <Route path='/search' component={SearchScreen}>
                </Route>
            </MemoryRouter>
        )       
        expect(wrapper.find('input').prop('value')).toBe('batman');

    })
    test('debe de mostrar un error si no se encuentra el hero', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/search?q=batman1']}>
                <Route path='/search' component={SearchScreen}>
                </Route>
            </MemoryRouter>
        )       
        expect(wrapper.find('.alert-danger').exists()).toBe(true);
    })
    test('debe de llamar el push del history', () => {
        
        const history = {
            push : jest.fn()
        };
        const wrapper = mount(
            <MemoryRouter initialEntries={['/search?q=batman1']}>
                <Route path='/search' component={ () => <SearchScreen history={ history }/>}
                />
            </MemoryRouter>
        )       
        wrapper.find('input').simulate('change', {
            target: {
                name: 'hero',
                value: 'batman'
            }
        });

        wrapper.find('form').prop('onSubmit')({
            preventDefault(){}
        });

        expect(history.push).toHaveBeenCalledWith('?q=batman');

    })
    
})
