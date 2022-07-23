import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRecipes } from '../redux/index';
import { Link } from 'redux-devtools-extension';

export const Home = () => {
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
      <Link to='/createRecipe'>Crear receta</Link>
      <h1>Todas las recetas</h1>
      <button onClick={(e) => { handleClick(e) }}>
        actualizar
      </button>
      <div>
         <select name="" id="">
          <option value="">filtrar por dieta</option>
          <option value="asc">A-Z</option>
          <option value="desc">Z-A</option>
          <option value="">Nivel de comida saludable</option>
         </select>
        <div>
           {/*aca va el paginado*/}
          </div> 
      </div>
    </div>
  )
}


