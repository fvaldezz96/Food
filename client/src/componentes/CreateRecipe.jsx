import React from 'react'
import { postRecipe, filterByDieta } from '../redux/index';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';


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
      diets: [...input.diet, e.target.value]
    })
  }

  const handleDelete = (e) => {
    setInput({
      ...input,
      /* Está filtrando la matriz de dietas, eliminando la que coincide con el valor de `e`. */
      diets: input.diet.filter((d) => d !== e)
    })
  }


  useEffect(() => {
    dispatch(filterByDieta());
  }, [])

  return (
    <div>
      <div><a>Crea tu receta</a></div>
      <Link to='/home'>
        <button>volver</button>
      </Link>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <input
            onChange={(e) => handleChange(e)}
            type="text"
            placeholder="Nombre..."
            name="name"
            value={input.name}
          // key={input.name}
          />
          {errors.name && <h4>{errors.name}</h4>}
        </div>
        <div>
          <input
            onChange={(e) => handleChange(e)}
            type="text"
            placeholder="Descripcion..."
            value={input.summary}
            // key={input.summary}
            name="summary"
          />
          {errors.summary && <h4>{errors.summary}</h4>}
        </div>
        <div>
          <input
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
        <div>
          <input
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
          <select name='diet' onChange={(e) => handleSelect(e)}>
            <option value="diet">
              Dietas
            </option>
            {
              dietasSeleccion?.map((e) => {
                <option key={e.id} value={e.name}>
                  {e.name}
                </option>
              })
            }
          </select>
        </div>
        {
          input.diet.map((e) => (
            <div>
              <p>{e}</p>
              <button onClick={() => { handleDelete(e) }}>X</button>
            </div>
          ))}
        <div>
          <button>crear</button>
        </div>
      </form>
    </div>
  )
}
