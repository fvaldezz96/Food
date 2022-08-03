import React from 'react';
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getDetailRecipe } from '../redux/index';
import { Link } from 'react-router-dom';
import '../style/DetailRecipe.css';

export const DetailRecipe = (props) => {

  const dispatch = useDispatch();
  const { id } = props.match.params // se puede traer con useParams()
  const recipeDetail = useSelector(state => state.detailRecipe)
  // console.log(recipeDetail, 'soy el front(stado)');

  useEffect(() => {
    dispatch(getDetailRecipe(id));
  }, [dispatch, id]);

  return (
    <div>
      <Link to='/home'>
        <button className='btn back'>volver</button>
      </Link>
      <div className='detail'>
        {
          recipeDetail ? (
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
              <p className='p'>{recipeDetail.diets?.map((e) => e.name).join(", ")}</p>
              <p className='p'>{recipeDetail.summary?.replace(/<[^>]+>/g, '')}</p>
              <p className='p'>{recipeDetail.steps?.map((e) => e.step)}</p>
              <p className='p'>{recipeDetail.healthScore}</p>
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