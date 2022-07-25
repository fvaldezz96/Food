import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { filterByDieta } from '../redux/index';

export const NavBar = ({ handleFilterDiet }) => {

  const dispatch = useDispatch();
  // const diet = useSelector((s) => s.diet);

  const handleFilter = (e) => {
    dispatch(filterByDieta(e.target.value))
  }

  return (
    <div>
      <select>
        <option value="asc">A-Z</option>
        <option value="desc">Z-A</option>
      </select>
      <select>
        <option value="healthScore">Nivel de comida saludable</option>
      </select>
      <select name='diet'
        onChange={(e) => { handleFilter(e) }}
      >
        <option value="gluten free">gluten free</option>
        <option value="ketogenic">ketogenic</option>
        <option value="vegetarian">vegetarian</option>
        <option value="lacto vegetarian">lacto vegetarian</option>
        <option value="ovo vegetarian">ovo vegetarian</option>
        <option value="vegan">vegan</option>
        <option value="pescetarian">pescetarian</option>
        <option value="paleo">paleo</option>
        <option value="primal">primal</option>
        <option value="low fodmap">low fodmap</option>
        <option value="whole 30">whole 30</option>
      </select>
      <select name="" id="">
        <option value="create">creado</option>
        <option value="allRecipes">todas las recetas</option>
      </select>
    </div>
  )
}
