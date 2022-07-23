
import {
   GET_RECIPES
} from './actions.js';

let initialState = {
   recetas: [],
   allRecetas: []
}

function rootReducer(state = initialState, action) {
   switch (action.type) {
      /* Una cadena que representa el tipo de acción que se está realizando. */
      case GET_RECIPES:
         return {
            ...state,
            recetas: action.payload,
            allRecetas: action.payload

         }
      default:
         return state;
   }
}
export default rootReducer;