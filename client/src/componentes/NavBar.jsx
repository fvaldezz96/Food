import React from 'react'
// import { useSelector, useDispatch } from 'react-redux';
// import { filterByDieta } from '../redux/index';

export const NavBar = ({ handleHealthScore, handleFilterDiet, handleFilterOrder, handleFilterCreate }) => {

  // const dispatch = useDispatch();
  // const diet = useSelector((s) => s.diet);

  // const handleFilter = (e) => {
  //   dispatch(filterByDieta(e.target.value));

  // }


  return (
    <div>
      <select onChange={(e) => { handleFilterOrder(e) }}>
        <option value="A-Z">A-Z</option>
        <option value="Z-A">Z-A</option>
      </select>
      <select onChange={(e) => { handleHealthScore(e) }}>
        <option value="healthScore">Nivel saludable</option>
      </select>
      <select name='diet'
        /* Llamar a la función handleFilter y pasar el evento como argumento. */
        onChange={(e) => { handleFilterDiet(e) }}
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
      <select onChange={(e) => { handleFilterCreate(e) }}>
        <option value="crear">creado</option>
        <option value="recetas">recetas</option>
      </select>
    </div>
  )
}
