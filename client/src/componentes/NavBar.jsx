import React from 'react';
import '../style/NavBar.css';

export const NavBar = ({ handleHealthScore, handleFilterDiet, handleFilterOrder, handleFilterCreate }) => {

  return (
    <div >
      <select className='orden' onChange={(e) => { handleFilterOrder(e) }}>
        <option value="">Ordenamiento</option>
        <option value="A-Z">A-Z</option>
        <option value="Z-A">Z-A</option>
      </select>
      <select className='orden' onChange={(e) => { handleHealthScore(e) }}>
        <option value="nivel saludable">Nivel saludable</option>
        <option value="asc">Acendente</option>
        <option value="des">Desendente</option>
      </select>
      <select
        className='orden'
        onChange={(e) => handleFilterDiet(e)}
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
      <select className='orden' onChange={(e) => { handleFilterCreate(e) }}>
        <option value="all">recetas</option>
        <option value="create">creado</option>
      </select>
    </div>
  )
}
