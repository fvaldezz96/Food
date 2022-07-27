import React from 'react'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getNameRecipe } from '../redux/index';

export const SearchBar = () => {

  const dispatch = useDispatch();
  const [name, setName] = useState("");
  // const oneRecipe = useSelector((e) => e.recipe)

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(getNameRecipe(name))
    setName("");
    /* Establecer el estado de la entrada en una cadena vacía. */
  }

  const handleChange = (e) => {
    e.preventDefault();
    setName(e.target.value);
    /* Establecer el valor de la entrada en el estado. */
  }

  return (
    <div>
      <div>
        <input
          onChange={(e) => handleChange(e)}
          type="text"
          value={name}
          id="search"
          placeholder='Buscar...'
        />
        <button type='submit' onClick={(e) => { handleSubmit(e) }}>Ir</button>
      </div>
    </div>
  )
}
