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
  const dietasSeleccion = useSelector((state) => state.filterByDieta);
  /* Un gancho que se utiliza para acceder al estado de la tienda. */

  const [errors, setErrors] = useState({});
  const [input, setInput] = useState({
    name: "",
    summary: "",
    healthScore: "",
    steps: "",
    diets: []
  });

  const handleSubmit = (e) => {
    if (Object.keys(errors).length === 0) {
      dispatch(postRecipe(input));
      alert('Su receta fue creada con exito');
      setInput({
        name: "",
        summary: "",
        healthScore: "",
        steps: "",
        diets: []
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
      diets: [...input.diets, e.target.value]
    })
  }

  const handleDelete = (e) => {
    setInput({
      ...input,
      /* Está filtrando la matriz de dietas, eliminando la que coincide con el valor de `e`. */
      diets: input.diets.filter((d) => d !== e)
    })
  }


  useEffect(() => {
    dispatch(filterByDieta());
  }, [dispatch])

  return (
    <div>
      <div><a>Crea tu receta</a></div>
      <Link to='/home'>
        <button>volver</button>
      </Link>
      <form onChange={(e) => { handleSubmit(e) }}>
        <div>
          <input
            onChange={(e) => { handleChange(e) }}
            type="text"
            placeholder="Nombre..."
            value={input.name}
          />
          {errors.name && <h4>{errors.name}</h4>}
        </div>  <div>
          <input
            onChange={(e) => { handleChange(e) }}
            type="text"
            placeholder="Descripcion..."
            value={input.summary}
          />
          {errors.summary && <h4>{errors.summary}</h4>}
        </div>  <div>
          <input
            onChange={(e) => { handleChange(e) }}
            type="text"
            placeholder="Nivel saludable..."
            value={input.healthScore}
          />
          {errors.healthScore && <h4>{errors.healthScore}</h4>}
        </div>  <div>
          <input
            onChange={(e) => { handleChange(e) }}
            type="text"
            placeholder="Pasos..."
            value={input.steps}
          />
          {errors.steps && <h4>{errors.steps}</h4>}
        </div>
        <div>
          <select name='name' onChange={(e) => { handleSelect(e) }}>
            <option value="diets">
              Dietas
            </option>
            {
              dietasSeleccion?.map((e) => {
                <option key={e.id} value={e.name}>
                  {diets.name}
                </option>
              })
            }
          </select>
        </div>
        {
          input.diets.map((e) => (
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
