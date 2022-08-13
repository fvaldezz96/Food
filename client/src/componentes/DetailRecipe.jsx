import React from 'react';
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getDetailRecipe, resetDetail } from '../redux/index';
import { Link } from 'react-router-dom';
import '../style/DetailRecipe.css';

export const DetailRecipe = (props) => {

  const dispatch = useDispatch();
  const { id } = props.match.params;
  const recipeDetail = useSelector(state => state.detailRecipe);

  useEffect(() => {
    dispatch(getDetailRecipe(id));
    dispatch(resetDetail());
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
              <div className='p'>{recipeDetail.diets?.map((e) => e).join(", ")}</div>
              <div className='container-image'>
                <img
                  alt='img not found'
                  className='image'
                  src={
                    recipeDetail.image ||
                    "https://www.acbar.org/Website/Loader/loader3.gif"
                  }
                />
                <div>
                  <div className='description'>{recipeDetail.summary?.replace(/<[^>]+>/g, '')}</div>
                </div>
              </div>
              <div className='container-steps'>
                <div className='p'>{recipeDetail.steps.map((e, k) => <div key={k}><h5 className='numberStep'>Step {e.number}:</h5><p className='numberStep'>{e.step}</p></div>)}</div>
              </div>
              <div className='p'>Nivel saludable: {recipeDetail.healthScore}</div>
            </div>
          ) : (
            <h5>no hay detalles de esta receta</h5>
          )}
      </div>
    </div >
  )
};
