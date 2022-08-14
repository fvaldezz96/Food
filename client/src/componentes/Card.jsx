import React from 'react';
import '../style/Card.css';

export const Card = ({ image, name, diets, healthScore }) => {
  // const dietas = diets.map(e => e.name)
  return (
    <div className='card'>
      <h1 className='name'>{name}</h1>
      <img className='imagen' src={image} alt="img not fond" />
      <div>
        <h4 className='diet'>{diets.join(', ')}</h4>
        <h5 className='nivel'>{healthScore}</h5>
      </div>
    </div>
  )
}
