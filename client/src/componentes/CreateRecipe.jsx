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
    setInput({
      ...input,
      [name]: value
    })

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
      diet: [...input.diet, e.target.value]
    })
  }

  const handleDelete = (e) => {
    setInput({
      ...input,
      diet: input.diet.filter((d) => d !== e)
    })
  }

  useEffect(() => {
    dispatch(filterByDieta());
    dispatch(getDiet())
  }, [dispatch])

  return (
    <div>
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
            id="name"
            value={input.name}
          />
          {errors.name && <h4>{errors.name}</h4>}
        </div>
        <div >
          <label className="" ></label>
          <input
            className="url"
            type="url"
            name="background_image"
            id="background_image"
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
            name="healthScore"
            id="healthScore"
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
            name="summary"
            id="summary"
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
            name="steps"
            id="steps"
          />
          {errors.steps && <h4>{errors.steps}</h4>}
        </div>
        <div>
          <br />
          <select className="botonSelect" name='diet' onChange={(e) => handleSelect(e)}>
            <option value="diet">Dietas</option>
            {
              dietasSeleccion?.map((e, index) => {
                return (
                  <option key={index} value={e.name}>{e.name}</option>
                )
              })
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
