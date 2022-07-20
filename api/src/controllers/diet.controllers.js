require('dotenv').config();
// const axios = require('axios');
const { Diet } = require('../db');

const getAllDiet = async (req, res) => {
   try {
      //uso codigo duro para no hacer tantos pedidos a la api , de esta manera de forma
      //manual me puedo traer los nombres sin hacer tantas request a la api .
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
         { name: 'whole30' }
      ]
      //es diet.bulkCreate estoy creando con los tipos de dato
      await Diet.bulkCreate(types);
      //y en la variable db me traigo todo lo que esta en la db.
      const db = await Diet.findAll();
      res.status(201).send(db)
   } catch (error) {
      // res.status(404).send(error)
      console.log(error)
   }
}

module.exports = (
   getAllDiet
)

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