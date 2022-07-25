import React from 'react'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getNameRecipe } from '../redux/index';

export const SearchBar = () => {

  const dispatch = useDispatch();
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(getNameRecipe(e.target.value))
    /* Establecer el estado de la entrada en una cadena vacía. */
    setName("");
  }

  const handleChange = (e) => {
    e.preventDefault();
    /* Establecer el valor de la entrada en el estado. */
    setName(e.target.value);
  }

  return (
    <div>
      <div>
        <input
          onChange={(e) => { handleSubmit(e) }}
          type="text"
          value={name}
          id="search"
          placeholder='Buscar...'
        />
        <button type='submit' onClick={(e) => { handleChange(e) }}></button>
      </div>
    </div>
  )
}
