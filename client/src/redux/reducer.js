
import {
   GET_RECIPES,
   GET_NAME_RECIPES,
   GET_DETAIL_RECIPE,
   FILTER_DIET,
   FILTER_ORDER,
   FILTER_HEALTHSCORE,
   FILTER_CREATE,
   POST_RECIPE
} from './actions.js';

let initialState = {
   recetas: [],
   allRecetas: [],
   diet: [],
   detailRecipe: {}
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
         const filtrado = state.recetas.filter((e) => e.name === action.payload[0].name)
         console.log(action.payload, 'soy el obj action.payload')
         console.log(filtrado, 'soy la variable filtrado')
         return {
            ...state,
            recetas: filtrado
         }

      case GET_DETAIL_RECIPE:
         return {
            ...state,
            detailRecipe: action.payload
         }
      case FILTER_DIET:
         // console.log(action.payload)
         const dietCopy = state.allRecetas.filter((e) => e.diets.find((d) => d === action.payload));
         // console.log('esto es el estado', state.allRecetas)
         // console.log("esto es dietcopy: ", dietCopy)
         return {
            ...state,
            recetas: dietCopy,
            //recetas : action.payload
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
         }
      default:
         return state;
   }
}
export default rootReducer;