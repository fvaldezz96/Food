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
  if(!input.image){
    errors.image = 'che flata la imagen'
  }
  return errors;
}

export const CreateRecipe = () => {

  const history = useHistory();
  const dispatch = useDispatch();
  const dietasSeleccion = useSelector((state) => state.diet);
  /* Un gancho que se utiliza para acceder al estado de la tienda. */

  const [objectStep, setObjectStep] = useState({ number: 0, step: '' })
  const [errors, setErrors] = useState({});
  const [input, setInput] = useState({
    name: "",
    summary: "",
    healthScore: "",
    image: "",
    steps: [],
    diets: []
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(
      validations({
        ...input,
        [e.target.name]: e.target.value
      })
    );
    if (!input.name && !input.summary && !input.image && !input.diets.length && !input.steps.lengt) return alert('No hay informacion');
    if (Object.keys(errors).length === 0) {
      dispatch(postRecipe(input));
      alert('Su receta fue creada con exito');
      setInput({
        name: "",
        summary: "",
        image: "",
        healthScore: "",
        steps: [],
        diets: []
      })
      history.push('/home');
    } else {
      alert('Completar todos los campos')
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
    if (!input.diets.find((i) => i === e.target.value)) {
      setInput({
        ...input,
        diets: [...input.diets, e.target.value]
      })
    }
  }

  const handleDelete = (e) => {
    setInput({
      ...input,
      diets: input.diets.filter((d) => d !== e)
    })
  }

  const handleChangeObjectStep = (e) => {
    setObjectStep({
      ...objectStep,
      [e.target.name]: e.target.value
    })
  }

  const addStep = () => {
    let newStep = { number: objectStep.number, step: objectStep.step }
    if (!newStep.number || !newStep.step || !!input.steps.find(e => e.number === newStep.number)) {
      alert('espacio vacio')
    } else {
      setInput({
        ...input,
        steps: [...input.steps, newStep]
      })
      setObjectStep({ number: 0, step: '' })
    }
  }

  const deleteStep = (number) => {
    setInput({
      ...input,
      steps: input.steps.filter(e => e.number !== number)
    })
  }

  useEffect(() => {
    dispatch(filterByDieta());
    dispatch(getDiet())
  }, [dispatch])

  return (
    <div className='cR'>
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
          // required
          />
          {errors.name && <h4>{errors.name}</h4>}
        </div>
        <div >
          <label className="" ></label>
          <input
            className="url"
            type="url"
            name="image"
            id="image"
            value={input.image}
            placeholder="URL"
            onChange={(e) => handleChange(e)}
          // required
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
          // required
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
            autoComplete="false"
            className="pasos"
            onChange={(e) => handleChangeObjectStep(e)}
            type={'number'}
            value={objectStep.number}
            name="number"
          />
          <label>Step</label>
          <textarea
            name="step"
            type={'text'}
            placeholder="Pasos..."
            value={objectStep.step}
            onChange={(e) => handleChangeObjectStep(e)}></textarea>
          <button type='button' className='botonPasos' onClick={addStep}>Agregar Paso</button>
          {!!input.steps.length &&
            <div>
              {input.steps.map((e, k) => {
                return (
                  <div key={k}>
                    <div>
                      <p>Number</p>
                      <p>{e.number}</p>
                    </div>
                    <div>
                      <p>{e.step}</p>
                      <button type='button' onClick={() => deleteStep(e.number)}>X</button>
                    </div>
                  </div>
                )
              })}
            </div>}
          {errors.steps && <h4>{errors.steps}</h4>}
        </div>
        <div>
          <br />
          <select className="botonSelect" name='diets' onChange={(e) => handleSelect(e)}>
            <option value="diets">Dietas</option>
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
          input.diets.map((a) => (
            <div className='dietAdd'>
              <p>{a}</p>
              <button type='button' className='btnDelet' onClick={() => { handleDelete(a) }}>x</button>
            </div>
          ))}
        <div>
          <button className='botonCrear'>crear</button>
        </div>
      </form>
    </div>
  )
}
