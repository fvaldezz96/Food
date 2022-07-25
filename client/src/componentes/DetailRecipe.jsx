import React from 'react'
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getDetailRecipe } from '../redux';

export const DetailRecipe = () => {
 
  


  return (
    <div>
      <div>
        <button>volver</button>
      </div>
      <img src="" alt="" />
      <h1>{name}</h1>
      <h3>tipo de plato</h3>
      <h4>tipo de dieta</h4>
    </div>
  )
}
