import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRecipes } from '../redux/index';
import { Link } from 'redux-devtools-extension';
import { Card } from './Card';
import { SearchBar } from './SearchBar';
import { Paginado } from './Paginado';
import { NavBar } from './NavBar';
import { CreateRecipe } from './CreateRecipe';
import { DetailRecipe } from './DetailRecipe';

import {
  
} from '../redux/reducer';

export const Home = () => {
  // const create = CreateRecipe();
  const dispatch = useDispatch();
  const allRecipe = useSelector((state) => state.recetas);
  console.log(allRecipe)

  useEffect(() => {
    dispatch(getRecipes())
  }, []); //paso el array basio por que no depende de nada!  
  //  console.log(getRecipes)
  function handleClick(e) {
    e.preventDefault();
    dispatch(getRecipes())
  }


  return (
    <div>
      <div>
        <SearchBar />
      </div>
      {/* <Link to='/createRecipe'>
        <button onClick=""></button>
      </Link> */}
      <h1>Todas las recetas</h1>

      <button onClick={(e) => { handleClick(e) }}>
        actualizar
      </button>
      <div>
        <NavBar />
      </div>
      <div>
        <Paginado />
      </div>
      <div>
        {
          allRecipe?.map((e) => {
            return (
              <fragment>
                <Link to={'/home/' + e.id}>
                  <Card name={e.name} image={e.image} diets={e.diets} key={e.id} />
                </Link>
              </fragment>
            )
          })
        }
      </div>
    </div>
  )
}


