// require('dotenv').config();
// const axios = require('axios');
const { Diet } = require('../db');

const getAllDiet = async (req, res) => {

   try {
      const types = [
         { name: 'gluten free' },
         { name: 'ketogenic' },
         { name: 'vegetarian' },
         { name: 'lacto vegetarian' },
         { name: 'ovo vegetarian' },
         { name: 'vegan' },
         { name: 'pescetarian' },
         { name: 'paleo' },
         { name: 'primal' },
         { name: 'low fodmap' },
         { name: 'whole 30' }
      ]
      // await Diet.bulkCreate(types); // de esta manera cada ves que hago un llamado estoy creando recetas con estos nombres .
      const insertDiet = types.map(async (e) => await Diet.findOrCreate({ where: e }))
      // const db = await Diet.findAll();
      await Promise.all(insertDiet);
      const dbDiet = await Diet.findAll();
      res.send(dbDiet)
   } catch (error) {
      console.log(error)
   }
      // res.status(404).send(error)
}

module.exports = {
   getAllDiet
}

// const allApi = async (req, res) => {
//    try {
//       const datos = (axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.API_KEY}&addRecipeInformation=true&number=100`)).data.result;
//       const datosDieta = datos.map((e) => e.diets).flat();
//       /* Devolviendo una matriz de objetos con la propiedad de nombre. */
//       return [...new Set(datosDieta)].map((e) => ({ name: e }))
//    } catch (error) {
//       res.status(404).send(error)
//    }
//    res.status(404).send(datosDieta);
// }
//    let arrayApiDiets = allApi;
//module.exports = (
   // allApi,
//)