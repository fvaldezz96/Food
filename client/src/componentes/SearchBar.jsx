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
    <div>
      <div className="container-3">
        <input className='inputStyle'
          type="text"
          id="search"
          value={name}
          onChange={(e) => handleChange(e)}
          placeholder="Buscar..."
        />
        <button className='botonIr' type='submit' onClick={(e) => handleSubmit(e)}>Ir</button>
      </div>
    </div>
  )
}
