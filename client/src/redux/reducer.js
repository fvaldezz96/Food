
import {
   GET_RECIPES,
   GET_NAME_RECIPES,
   GET_DETAIL_RECIPE,
   FILTER_BY_STATUS,
   FILTER_ORDER,
   FILTER_HEALTHSCORE,
   FILTER_CREATE,
   POST_RECIPE
} from './actions.js';

let initialState = {
   recetas: [],
   allRecetas: [],
   diet: [],
   detailRecipe: [],
   createRecipe: []
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
      case GET_NAME_RECIPES:
         return {
            ...state,
            recetas: action.payload
         }

      case GET_DETAIL_RECIPE:
         return {
            ...state,
            detailRecipe: action.payload
         }
      case FILTER_BY_STATUS:
         return {
            ...state,
            recetas: action.payload,
            //  recetas : action.payload
         }
      case FILTER_ORDER:
         const sortArr = action.payload === "A-Z" ?
            state.recetas.sort((a, b) => {
               if (a.name > b.name) {
                  return 1;
               }
               if (b.name > a.name) {
                  return - 1;
               }
               return 0
            }) : state.recetas.sort((a, b) => {
               if (a.name > b.name) {
                  return -1
               }
               if (b.name > a.name) {
                  return 1;
               }
               return 0
            })
         /* Devolviendo el estado y la matriz de recetas. */
         return {
            ...state,
            recetas: sortArr
         }

      case FILTER_HEALTHSCORE:
         return {
            ...state,
            recetas: action.payload,
         }
      case FILTER_CREATE:
         const filterRecipe = action.payload === "recetas"
            ? state.recetas.filter((e) => e.id.length > 10)
            : state.recetas.filter((e) => e.id.toString().length > 6);
         return {
            ...state,
            recetas: action.payload === "crear"
               ? state.recetas : filterRecipe
         }
      case POST_RECIPE:
         return {
            ...state,
            createRecipe: action.payload
         }
      default:
         return state;
   }
}
export default rootReducer;