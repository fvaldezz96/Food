import React from 'react';
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getDetailRecipe } from '../redux/index';
import { Link } from 'react-router-dom';
import '../style/DetailRecipe.css';

export const DetailRecipe = (props) => {

  const dispatch = useDispatch();
  const { id } = props.match.params
  /* Una forma de obtener la identificación de la url. */
  const recipeDetail = useSelector((state) => state.detailRecipe);
  console.log(recipeDetail, 'soy el front(stado)');

  useEffect(() => {
    dispatch(getDetailRecipe(id));
  }, [dispatch, id]);
  /* Una matriz de dependencia. Se usa para decirle a React que su efecto depende de props.id y
    dispatch y que debe volver a ejecutarse cuando props.id o dispatch cambien. */

  return (
    <div>
      <Link to='/home'>
        <button>volver</button>
      </Link>
      <div>
        {
          recipeDetail ? (
            <div>
              <p>{recipeDetail.name}</p>
              <div>
                <img
                  src={
                    recipeDetail.image ||
                    "https://www.acbar.org/Website/Loader/loader3.gif"
                  }
                />
              </div>
              {/* <p >tipo de plato</p> */}
              <p >{recipeDetail.diets?.map((e) => e.name).join(", ")}</p>
              <p >{recipeDetail.summary}</p>
              <p >{recipeDetail.steps?.map((e) => e.step)}</p>
              <p >{recipeDetail.healthScore}</p>
            </div>
          ) : (
            <h5>no hay detalles de esta receta</h5>
          )}
      </div>
    </div >
  )
};





// <img src="" alt="" />
// <h1>{name}</h1>
// <h3>tipo de plato</h3>
// <h4>tipo de dieta</h4>