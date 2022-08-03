import React from 'react';
import { useSelector } from 'react-redux';
import '../style/NavBar.css';

export const NavBar = ({ handleHealthScore, handleFilterDiet, handleFilterOrder, handleFilterCreate }) => {

  const dietas = useSelector(state => state.diet);

  return (
    <div >
      <select className='orden' onChange={(e) => { handleFilterOrder(e) }}>
        <option value="all">Ordenamiento</option>
        <option value="A-Z">A-Z</option>
        <option value="Z-A">Z-A</option>
      </select>
      <select className='orden' onChange={(e) => { handleHealthScore(e) }}>
        <option value="nivel">Nivel saludable</option>
        <option value="asc">Acendente</option>
        <option value="des">Desendente</option>
      </select>
      <select
        className='orden'
        onChange={(e) => handleFilterDiet(e)}
      >
        <option value="all">Tipos de Dietas</option>
        {
          dietas?.map((e, index) => (
            <option key={index} value={e.name}>{e.name}</option>
          ))
        }

      </select>
      <select className='orden' onChange={(e) => { handleFilterCreate(e) }}>
        <option value="all">Recetas</option>
        <option value="create">Creado</option>
      </select>
    </div>
  )
}
