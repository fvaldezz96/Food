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

export const Home = () => {
  const create = CreateRecipe();
  const dispatch = useDispatch();
  const allRecipes = useSelector((state) => state.recetas)

  useEffect(() => {
    dispatch(getRecipes())
  }, []); //paso el array basio por que no depende de nada!  

  function handleClick(e) {
    e.preventDefault;
    dispatch(getRecipes())
  }


  return (
    <div>
      <div>
        <SearchBar/>
      </div>
      {/* <Link to='/createRecipe'>Crear receta</Link> */}
      <h1>Todas las recetas</h1>
      {/* <button onClick={create}></button> */}
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
          allRecipes && allRecipes.map((e) => {
            <Card name={e.name} image={e.image} diets={e.diets} />
          })
        }
      </div>
    </div>
  )
}


