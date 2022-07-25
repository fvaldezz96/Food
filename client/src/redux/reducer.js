
import {
   GET_RECIPES,
   FILTER_BY_STATUS,
   FILTER_ORDER,
   FILTER_HEALTHSCORE
} from './actions.js';

let initialState = {
   recetas: [],
   allRecetas: [],
   diet: []
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
      case FILTER_BY_STATUS:
         return {
            ...state,
            allRecetas: action.payload
         }
      case FILTER_ORDER:
         return {
            ...state,

         }

      case FILTER_HEALTHSCORE:
         return {
            ...state,
         }
      default:
         return state;
   }
}
export default rootReducer;