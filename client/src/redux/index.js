import axios from 'axios';

import {
   GET_RECIPES,
   GET_NAME_RECIPES,
   GET_DETAIL_RECIPE,
   FILTER_DIET,
   FILTER_ORDER,
   FILTER_HEALTHSCORE,
   FILTER_CREATE,
   POST_RECIPE,
   GET_DIET,
   RESET_DETAIL
} from './actions.js';

export const getRecipes = () => {
   return async function (dispatch) {
      const recipesData = await axios.get("http://localhost:3001/recipe")
      return dispatch({
         type: GET_RECIPES,
         payload: recipesData.data
      })
   }
};

export const getNameRecipe = (name) => {
   // console.log(name, 'soy el action create')
   return async (dispatch) => {
      try {
         const nameRecipe = await axios.get(`http://localhost:3001/recipe/name?name=${name}`)
         // console.log(nameRecipe, 'soy nameRecipe')
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
   // console.log(id, 'soy el id de action')
   return async (dispatch) => {
      try {
         const detalle = await axios.get(`http://localhost:3001/recipe/${id}`);
         // console.log(detalle.data, 'soy el detalle');
         return dispatch({
            type: GET_DETAIL_RECIPE,
            payload: detalle.data
         
         })
      } catch (error) {
         console.log(error)
      }
   }
}

export const filterByDieta = (payload) => {
   // console.log('esto es action',payload)
   return ({
      type: FILTER_DIET,
      payload
   })
}

export const getDiet = () => {
   return async function (dispatch) {
      const dietData = await axios.get("http://localhost:3001/diet")
      return dispatch({
         type: GET_DIET,
         payload: dietData.data
      })
   }
};

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
   // console.log(payload,'soy el payload de las action')
   return ({
      type: FILTER_CREATE,
      payload
   })
}

export const postRecipe = (payload) => {
   // console.log(payload, 'soy el payload de postRecipe')
   return async (dispatch) => {
      const crearRecipe = await axios.post("http://localhost:3001/recipe", payload)
      // console.log(crearRecipe, 'soy la variable')
      return dispatch({
         type: POST_RECIPE,
         payload: crearRecipe
      })
   }
}

export function resetDetail(payload) {
   return {
       type: RESET_DETAIL,
       payload
   }
}

