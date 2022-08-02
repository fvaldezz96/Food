import React from 'react'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getNameRecipe } from '../redux/index';
import '../style/SearchBar.css';

export const SearchBar = () => {

  const dispatch = useDispatch();
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getNameRecipe(name));
    // console.log(getNameRecipe())
    setName("");
  }

  const handleChange = (e) => {
    e.preventDefault();
    setName(e.target.value);
  }

  return (
    <div className="contenedorSearch">
      <div className="container-3">
        <input
          type="text"
          id="search"
          value={name}
          onChange={(e) => handleChange(e)}
          placeholder="Buscar..."
        />
        <button className='botonIr' type='submit' onClick={(e) => handleSubmit(e)}><i className="fa-solid fa-magnifying-glass"></i>Ir</button>
      </div>
    </div>
  )
}
