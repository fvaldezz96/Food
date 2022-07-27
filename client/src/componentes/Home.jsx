import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'redux-devtools-extension';
import { Card } from './Card';
import { SearchBar } from './SearchBar';
import { Paginado } from './Paginado';
import { NavBar } from './NavBar';

import {
  getRecipes,
  filterByDieta,
  filterOrder,
  filterCreateRecipe,
  filterHealthScore
} from '../redux/index';


export const Home = () => {
  // const create = CreateRecipe();
  const dispatch = useDispatch();
  /* Obtener el estado de la tienda redux.osea trae las recetas */
  const allRecipe = useSelector((state) => state.recetas);
  // console.log(allRecipe)
  const [currentPage, setCurrentPage] = useState(1);//va a empezar en uno 
  const [currentRecipePage, setCurrentRecipePage] = useState(10);//recetas por apginas
  const indexEnd = currentPage * currentRecipePage;
  const indexFirst = indexEnd - currentRecipePage;
  const currentRecipe = allRecipe.slice(
    indexFirst,
    indexEnd
    //toma el indice del primero y del ultimo personaje.
  );

  const [order, setOrder] = useState("");

  //esta me va a ayudar al renderisado .
  const page = (np) => {
    setCurrentPage(np)
  }

  const handleFilterDiet = (e) => {
    dispatch(filterByDieta(e.target.value))
    setCurrentPage(1);
    setOrder(e.target.value);
  }
  const handleFilterOrder = (e) => {
    dispatch(filterOrder(e.target.value))
    setCurrentPage(1);
    setOrder(e.target.value);
  }
  const handleFilterCreate = (e) => {
    dispatch(filterCreateRecipe(e.target.value));
    setCurrentPage(1);
    setOrder(e.target.value);
  }

  const handleHealthScore = (e) => {
    dispatch(filterHealthScore(e.target.value));
    setCurrentPage(1);
    setOrder(e.target.value);
  }
  //  console.log(getRecipes)
  const handleClick = (e) => {
    e.preventDefault();
    dispatch(getRecipes())
    // setOrder();
  }

  useEffect(() => {
    dispatch(getRecipes());
    dispatch(filterByDieta());
  }, []); //paso el array basio por que no depende de nada!  

  return (
    <div>
      <div>
        <SearchBar />
      </div>
      <div>
        <button onClick={(e) => { handleClick(e) }}>
          actualizar
        </button>
        <Link to='/create'>
          <button>crear</button>
        </Link>
      </div>
      <div>
        <NavBar
          handleFilterDiet={handleFilterDiet}
          handleFilterOrder={handleFilterOrder}
          handleFilterCreate={handleFilterCreate}
          handleHealthScore={handleHealthScore}
        />
      </div>
      <div>
        <Paginado
          currentRecipePage={currentRecipePage}
          allRecipe={allRecipe.length}
          page={page}
        />
      </div>
      <div>
        {
          currentRecipe?.map((e, index) => {
            return (
              <div key={index}>
                { /* Creación de un enlace a la página de detalles de la receta. */}
                <Link to={`/home/${e.id}`}>
                  <Card
                    name={e.name}
                    image={e.image}
                    diets={e.diets}
                  />
                </Link>
              </div>
            )
          })}
      </div>
    </div>
  )
}


