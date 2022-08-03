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
  const dispatch = useDispatch();
  const todasLasRecetas = useSelector((state) => state.recetas);
  // eslint-disable-next-line
  const [order, setOrder] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  // eslint-disable-next-line
  const [currentRecipePage, setCurrentRecipePage] = useState(10);
  const indexEnd = currentPage * currentRecipePage;//10
  const indexFirst = indexEnd - currentRecipePage;//0
  const currentRecipe = todasLasRecetas.slice(indexFirst, indexEnd);

  const page = (np) => {
    setCurrentPage(np)
  }

  const handleFilterDiet = (e) => {
    e.preventDefault();
    dispatch(filterByDieta(e.target.value))
    setCurrentPage(1);
  }

  const handleFilterOrder = (e) => {
    e.preventDefault();
    dispatch(filterOrder(e.target.value))
    setCurrentPage(1);
    setOrder(e.target.value);
  }

  const handleFilterCreate = (e) => {
    e.preventDefault();
    dispatch(filterCreateRecipe(e.target.value));
    setCurrentPage(1);
    setOrder(e.target.value);
  }

  const handleHealthScore = (e) => {
    dispatch(filterHealthScore(e.target.value));
    setCurrentPage(1);
    setOrder(e.target.value);
  }
  //  console.log(dispatch)
  const handleClick = (e) => {
    e.preventDefault();
    dispatch(getRecipes())
  }

  useEffect(() => {
    dispatch(getRecipes());
    dispatch(getDiet());
  }, [dispatch]);

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
          currentRecipe ? currentRecipe.map((e, index) => {
            return (
              <div key={index}>
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
          : <p>Loanding...</p>
        }
      </div>
    </div>
  )
}


  // const handleFilter = (e, funcion) => { 
  //   dispatch(funcion(e.target.value))
  //   setCurrentPage(1);
  //   setOrder(e.target.value); 
  //  }