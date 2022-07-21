const axios = require('axios');
const { Recipe, Diet } = require('../db');

const allRecipes = async () => {
   try {
      const typeRecipes = await (axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.API_KEY}&addRecipeInformation=true&number=100`)).data.result;
      const mapeoRecipes = typeRecipes.map((e) => ({
         id: e.id,
         name: e.name,
         step: e.step,
         summary: e.summary,
         healthScore: e.healthScore,
         image: e.image
      }))
      return mapeoRecipes;
   } catch (error) {
      console.log(error)
   }
}

const allDb = async () => {
   try {
      /* Obtener todas las recetas de la base de datos e incluir el nombre de la dieta. */
      const db = await Recipe.findAll({ include: { model: Diet, attributes: ['name'] } });
      const allData = db.map((e) => ({
         id: e.id,
         name: e.name,
         step: e.step,
         summary: e.summary,
         healthScore: e.healthScore,
         image: e.image,
         diet: e.diet.map(e => e.name)
      }));
      return allData;
   } catch (error) {
      console.log(error)
   }
}

//en esta funcion haciendo el contac puedo consumir datos de al api y db 
const getRecipesandDb = (req, res) => {
   try {
      const allNameRecipe = await allRecipes();
      const allNameDb = await allDb();
      const allNames = [...allNameRecipe, ...allNameDb];
      res.send(allNames);
   } catch (error) {
      console.log(error)
   }
}




module.exports = {
   allRecipes,
   allDb,
   getRecipesandDb
}