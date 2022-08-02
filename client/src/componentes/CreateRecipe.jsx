import React from 'react'
import { postRecipe, filterByDieta, getDiet } from '../redux/index';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import '../style/CreateRecipe.css';

const validations = (input) => {
  const errors = {}
  if (!input.name.trim()) {
    errors.name = 'Debe completar con un nombre'
  }
  if (!input.summary.trim()) {
    errors.summary = 'Debe completar con una descripcion'
  }
  if (!input.healthScore.trim()) {
    errors.healthScore = 'Debe completar con un valor'
  }
  if (!input.steps.trim()) {
    errors.steps = 'Describa los pasos'
  }
  return errors;
}

export const CreateRecipe = () => {

  const history = useHistory();
  const dispatch = useDispatch();
  const dietasSeleccion = useSelector((state) => state.diet);
  /* Un gancho que se utiliza para acceder al estado de la tienda. */

  const [errors, setErrors] = useState({});
  const [input, setInput] = useState({
    name: "",
    summary: "",
    healthScore: "",
    steps: "",
    diet: []
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(
      validations({
        ...input,
        [e.target.name]: e.target.value
      })
    );
    if (Object.keys(errors).length === 0) {
      dispatch(postRecipe(input));
      alert('Su receta fue creada con exito');
      setInput({
        name: "",
        summary: "",
        healthScore: "",
        steps: "",
        diet: []
      })
      history.push('/home');
    } else {
      alert('No se pudo crear tu receta')
    }
    return
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    /* `e.target` es el elemento que desencadenó el evento. */
    setInput({
      ...input,
      [name]: value
    })
    /* Copiar el estado actual de `input` y luego actualizar el valor de la propiedad que coincide con
   el `name` de la entrada que se cambió. */
    setErrors(
      validations({
        ...input,
        [name]: value
      })
    )
  };

  const handleSelect = (e) => {
    setInput({
      ...input,
      /* Agregar el valor de la entrada a la matriz de dietas. */
      diet: [...input.diet, e.target.value]
    })
  }

  const handleDelete = (e) => {
    setInput({
      ...input,
      /* Está filtrando la matriz de dietas, eliminando la que coincide con el valor de `e`. */
      diet: input.diet.filter((d) => d !== e)
    })
  }

  useEffect(() => {
    dispatch(filterByDieta());
    dispatch(getDiet())
  }, [])

  return (
    <div>
      {/* <div className='titulo'>Crea tu receta</div> */}
      <Link to='/home'>
        <button className='botonVolver'>volver</button>
      </Link>
      <form className="form" onSubmit={(e) => handleSubmit(e)}>
        <div>
          <input
            className="input"
            onChange={(e) => handleChange(e)}
            type="text"
            placeholder="Nombre..."
            name="name"
            value={input.name}
          // key={input.name}
          />
          {errors.name && <h4>{errors.name}</h4>}
        </div>
        <div >
          <label className="" ></label>
          <input
            className="url"
            type="url"
            name="background_image"
            value={input.background_image}
            placeholder="URL"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <br />
        <div>
          <input
            className="input"
            onChange={(e) => handleChange(e)}
            type="number"
            placeholder="Nivel saludable..."
            value={input.healthScore}
            // key={input.healthScore}
            name="healthScore"
            min="0"
            max="100"
          />
          {errors.healthScore && <h4>{errors.healthScore}</h4>}
        </div>
           <br />
        <div>
          <textarea
            className="descripcion"
            onChange={(e) => handleChange(e)}
            type="text"
            placeholder="Descripcion..."
            value={input.summary}
            // key={input.summary}
            name="summary"
          />
          {errors.summary && <h4>{errors.summary}</h4>}
        </div>
        <br />
        <div>
          <input
            className="pasos"
            onChange={(e) => handleChange(e)}
            type="text"
            placeholder="Pasos..."
            value={input.steps}
            // key={input.steps}
            name="steps"
          />
          {errors.steps && <h4>{errors.steps}</h4>}
        </div>
        <div>
          <br />
          <select className="botonSelect" name='diet' onChange={(e) => handleSelect(e)}>
            <option value="diet">Dietas</option>
            {
              dietasSeleccion?.map((e) => (
                <option key={e.id} value={e.name}>{e.name}</option>
              ))
            }
          </select>
        </div>
        {
          input.diet.map((e) => (
            <div className='dietAdd'>
              <p>{e}</p>
              <button className='btnDelet' onClick={() => { handleDelete(e) }}>X</button>
            </div>
          ))}
        <div>
          <button className='botonCrear'>crear</button>
        </div>
      </form>
    </div>
  )
}
