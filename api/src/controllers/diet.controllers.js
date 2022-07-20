/* El código anterior está cargando el paquete dotenv y configurándolo. */
require('dotenv').config();
const axios = require('axios');
const { Diet, } = require('../db');

const getAllDiet = () => {
   try {
      const allDiet = (axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.API_KEY}&addRecipeInformation=true&number=100`)).data.result
      const getDiet = allDiet.map((e) => {
         return {
            id: e.id,
            name: e.name,
         }
      })
   } catch (error) {

   }

}