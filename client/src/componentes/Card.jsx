import React from 'react';
import '../style/Card.css';

export const Card = ({ image, name, diets, healthScore }) => {
  // const dietas = diets.map(e => e.name)
  return (
    <div className='card'>
      <div >
        <img className='imagen' src={image} alt="img not fond" />
      </div>
      <h1 className='name'>{name}</h1>
      <div>
        <h4 className='diet'>Diets: {diets.join(', ')}</h4>
        <h5 className='nivelSaludable'>Level: {healthScore}</h5>
      </div>
    </div>
  )
}
