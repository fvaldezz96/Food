import React from 'react';
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getDetailRecipe } from '../redux/index';
import { Link } from 'react-router-dom';
import '../style/DetailRecipe.css';

export const DetailRecipe = (props) => {

  const dispatch = useDispatch();
  const { id } = props.match.params;
  const recipeDetail = useSelector(state => state.detailRecipe);
  // console.log(recipeDetail, 'soy el front(stado)');

  useEffect(() => {
    dispatch(getDetailRecipe(id));
  }, [dispatch, id]);

  return (
    <div className='container'>
      <Link to='/home'>
        <button className='btn back'>volver</button>
      </Link>

      <div className='detail'>
        {
          Object.keys(recipeDetail).length > 0 ? (
            <div>
              <p className='nameTitle'>{recipeDetail.name}</p>
              <div>
                <img
                  alt='img not found'
                  className='image'
                  src={
                    recipeDetail.image ||
                    "https://www.acbar.org/Website/Loader/loader3.gif"
                  }
                />
              </div>
              <div className='p'>{recipeDetail.summary?.replace(/<[^>]+>/g, '')}</div>
              <div className='p'>{recipeDetail.diets?.map((e) => e).join(", ")}</div>
              <div className='p'>{recipeDetail.steps.map((e, k) => <div key={k}><h5>Step {e.number}:</h5><p>{e.step}</p></div>)}</div>
              <div className='p'>{recipeDetail.healthScore}</div>
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