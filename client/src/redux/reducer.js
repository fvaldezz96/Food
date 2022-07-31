
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
         // console.log(action.payload, 'soy el obj action.payload')
         // console.log(filtrado, 'soy la variable filtrado')
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
         const dietCopy = state.allRecetas.filter((e) => e.diets.find((d) => d === action.payload));
         return {
            ...state,
            recetas: dietCopy,
         }
      case FILTER_ORDER:
         const todo = state.recetas;
         const sortArr = action.payload === "A-Z" ?
            todo.sort((a, b) => {
               if (a.name > b.name) return 1;
               if (b.name > a.name) return - 1;
               return 0
            }) : todo.sort((a, b) => {
               if (a.name > b.name) return -1
               if (b.name > a.name) return 1;
               return 0
            })
         /* Devolviendo el estado y la matriz de recetas. */
         return {
            ...state,
            recetas: sortArr,
         }

      case FILTER_HEALTHSCORE:
         const niveles = state.recetas;
         const array = action.payload === "asc" ?
            niveles.sort((a, b) => {
               if (a.healthScore > b.healthScore) return 1;
               if (a.healthScore < b.healthScore) return -1;
               return 0;
            }) : niveles.sort((a, b) => {
               if (a.healthScore > b.healthScore) return -1;
               if (a.healthScore < b.healthScore) return 1;
               return 0;
            });
         return {
            ...state,
            recetas: array,
         }

      case FILTER_CREATE:
         const todas = state.allRecetas
         const filterRecipe = action.payload === "create"
            // console.log(todas,'soy el todas')
            // console.log(action.payload,'soy el action payload')
            ? todas.filter((e) => e.id.length > 10)//UUID
            : todas.filter((e) => !e.id.length <= 6)//ID
         // console.log(state.allRecetas)
         return {
            ...state,
            recetas: action.payload === "all" ? state.allRecetas : filterRecipe
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