
import axios from 'axios';

import {
   GET_RECIPES
} from './actions.js';
// En este archivo meto la logica de las accios 
//Ademas en este archivo va la coneccion de back con el front

export function getRecipes() {
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