import React, { useMemo } from 'react'
import queryString from 'query-string';
import { HeroCard } from '../heroes/HeroCard';
import { useForm } from '../../hooks/useForm';
import { useLocation } from 'react-router-dom';
import { getHeroesByName } from '../../selector/getHeroesByName';

export const SearchScreen = ({history}) => {

    const location = useLocation();
    const {q = ''} = queryString.parse( location.search );

   
    const [formValues, handleInputChange] = useForm({
        hero: q
    });

    const { hero } = formValues;
    
    const filteredHeroes = useMemo(() => getHeroesByName(q), [q])
    localStorage.setItem('lastPath',`search?q=${hero}`)
    const handleSearch = (e) => {
        e.preventDefault()
        history.push(`?q=${hero}`);
    }

    return (
        <div className='row'>
            <div className='col-5'>
            <h4>Search</h4>
            <hr />
            <form onSubmit={handleSearch}>
                <input 
                    type='text'
                    placeholder='Find your hero'
                    className='form-control'
                    name ='hero'
                    autoComplete='off'
                    onChange={handleInputChange}
                    />
                <button type='submit'
                    className='btn mt-1 btn-block btn-outline-primary'
                    onClick={handleSearch}>
                        Search...
                </button>
            </form>
            </div>
            <div className='col-7'>
                <h4>Results</h4>
                <hr/>
                {(q ==='') && (<div className='alert alert-info'>
                    Search a hero
                </div>)
                }
                {(q !== '' && filteredHeroes.length === 0) && 
                <div className='alert alert-danger'>
                    No heroes found named "{q}"
                </div>
                }
              
                {
                 
                    filteredHeroes.map( hero => (
                        <HeroCard
                            key={hero.id}
                            {...hero}/>
                    ))
                
                }
             
            </div>
        </div>
    )
}
