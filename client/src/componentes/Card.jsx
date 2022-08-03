import React from 'react';
import '../style/Card.css';

export const Card = ({ image, name, diets, healthScore }) => {
  // const dietas = diets.map(e => e.name)
  return (
    <div className='card'>
      <h2 className='name'>{name}</h2>
      <img className='imagen' src={image} alt="img not fond" />
      <div>
        <h5 className='diet'>{diets.join(', ')}</h5>
        <h5 className='nivel'>{healthScore}</h5>
      </div>
    </div>
  )
}
