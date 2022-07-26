
import axios from 'axios';

import {
   GET_RECIPES,
   GET_NAME_RECIPES,
   GET_DETAIL_RECIPE,
   FILTER_BY_STATUS,
   FILTER_ORDER,
   FILTER_HEALTHSCORE,
   FILTER_CREATE
} from './actions.js';
// En este archivo meto la logica de las accios 
//Ademas en este archivo va la coneccion de back con el front

export const getRecipes = () => {
   /* Una función que devuelve una función que devuelve un objeto. */
   return async function (dispatch) {
      const recipesData = await axios.get("http://localhost:3001/recipe")
      /* Una variable que almacena los datos de la API. */
      return dispatch({
         type: GET_RECIPES,
         /* Una constante que se utiliza para identificar la acción. */
         payload: recipesData.data
         /* `payload` son los datos que se envían al reducer. */
      })
   }
};

export const getNameRecipe = (name) => {
   return async (dispatch) => {
      try {
         const nameRecipe = await axios.get(`http://localhost:3001/recipe${name}`)
         return dispatch({
            type: GET_NAME_RECIPES,
            payload: nameRecipe.data
         })
      } catch (error) {
         alert('No encontramos la Receta');
      }
   }
}

export const getDetailRecipe = (id) => {
   return async (dispatch) => {
      try {
         const detalle = await axios.get(`http://localhost:3001/recipe${id}`);
         return dispatch({
            type: GET_DETAIL_RECIPE,
            payload: detalle.data
         })
      } catch (error) {

      }
   }
}

export const filterByDieta = () => {
   return async function (dispatch) {
      const dietData = await axios.get("http://localhost:3001/diet")
      return dispatch({
         type: FILTER_BY_STATUS,
         payload: dietData.data
      })
   }
}

export const filterOrder = (payload) => {
   return ({
      type: FILTER_ORDER,
      payload
   })
}

export const filterHealthScore = (payload) => {
   return ({
      type: FILTER_HEALTHSCORE,
      payload
   })
}

export const filterCreateRecipe = (payload) => {
   return ({
      type: FILTER_CREATE,
      payload
   })
}