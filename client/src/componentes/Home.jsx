import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Card } from './Card';
import { SearchBar } from './SearchBar';
import { Paginado } from './Paginado';
import { NavBar } from './NavBar';
import '../style/Home.css';

import {
  getRecipes,
  filterByDieta,
  filterOrder,
  filterCreateRecipe,
  filterHealthScore,
  getDiet
} from '../redux/index';

export const Home = () => {
  // const create = CreateRecipe();
  const dispatch = useDispatch();
  /* Obtener el estado de la tienda redux.osea trae las recetas */
  const todasLasRecetas = useSelector((state) => state.recetas);
  const [order, setOrder] = useState("");
  // console.log(todasLasRecetas,'soy recetas de front');
  const [currentPage, setCurrentPage] = useState(1);//va a empezar en uno 
  const [currentRecipePage, setCurrentRecipePage] = useState(10);//recetas por apginas
  const indexEnd = currentPage * currentRecipePage;//10
  const indexFirst = indexEnd - currentRecipePage;//0
  const currentRecipe = todasLasRecetas.slice(indexFirst, indexEnd);
  //toma el indice del primero y del ultimo personaje.

  const page = (np) => {
    setCurrentPage(np)
  }

  const handleFilterDiet = (e) => {
    dispatch(filterByDieta(e.target.value))
    setCurrentPage(1);
    // setOrder(e.target.value);
  }

  const handleFilterOrder = (e) => {
    dispatch(filterOrder(e.target.value))
    setCurrentPage(1);
    setOrder(e.target.value);
  }
  // const handleFilter = (e, funcion) => { 
  //   dispatch(funcion(e.target.value))
  //   setCurrentPage(1);
  //   setOrder(e.target.value); 
  //  }
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
    dispatch(getDiet());
  }, []);

  return (
    <div>
      <div className='navBar'>
        <div className='divs'>
          <NavBar className='navs'
            handleFilterDiet={handleFilterDiet}
            handleFilterOrder={handleFilterOrder}
            handleFilterCreate={handleFilterCreate}
            handleHealthScore={handleHealthScore}
          />
          <Link to='/create'>
            <button className='navs'>crear</button>
          </Link>
          <button className='navs' onClick={(e) => { handleClick(e) }}>
            actualizar
          </button>
          <SearchBar className='navs' />
        </div>
      </div>
      <div>
        <Paginado
          currentRecipePage={currentRecipePage}
          todasLasRecetas={todasLasRecetas.length}
          page={page}
        />
      </div>
      <div className='Card'>
        {
          currentRecipe?.map((e, index) => {
            return (
              <div key={index}>
                { /* Creación de un enlace a la página de detalles de la receta. */}
                <Link to={`/detail/${e.id}`}>
                  <Card
                    name={e.name}
                    image={e.image}
                    diets={e.diets}
                    healthScore={e.healthScore}
                  />
                </Link>
              </div>
            )
          })
          // : <p>Loanding...</p>
        }
      </div>
    </div>
  )
}


