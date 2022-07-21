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
const getApiandDb = (req, res) => {
   try {
      const allNameRecipe = await allRecipes();
      const allNameDb = await allDb();
      const allNames = [...allNameRecipe, ...allNameDb];
      res.send(allNames);
   } catch (error) {
      console.log(error)
   }
}

//funcio  para encontrar por name la receta 
const getNames = async (req, res) => {
   try {
      const { name } = req.query;
      const allNamesRecetsApi = await allRecipes();
      const allNamesRecetsDb = await allDb();                                                           //tengo que estudiar la propiedad icludes          
      const nameEncontrado = [...allNamesRecetsApi, ...allNamesRecetsDb].filter((e) => e.title.toLowerCase().includes(name.toLowerCase()));
      !nameEncontrado.length ? res.send('Nombre no encontrado!') : res.send(nameEncontrado);
   } catch (error) {
      console.log(error)
   }
};

//funcion para encontrar por id la receta
const getId = async (req, res) => {
   try {
      const { id } = req.params;
      if (/^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i.test(id)) {
         const idRecipesApi = await allRecipes();
         const dataApi = idRecipesApi.filter((e) => e.id === Number(id));
         return res.send(dataApi);
      } else {
         const idRecipesDb = await allDb();
         const dataDb = idRecipesDb.filter((e) => e.id === id)
         return res.send(dataDb)
      }
   } catch (error) {
      console.log(error)
   }
};

//funcion para crear la receta desde el formulario .
const createRecipe = async (req, res) => {
   try {
      const { name, summary, healthScore, steps, diets } = req.body
      if (!name || !summary) res.send('Faltan datos');
      const createRecipe = await Recipe.create({ name, summary, healthScore, steps, diets });
      const dataDiet = await diets.map(async (e) => await Diet.findOne({ where: { name: e } }));
      const promise = await Promise.all(dataDiet);
      createRecipe.addDiets(promise);
      res.send(createRecipe);
   } catch (error) {
      res.send('No pudimos crear su receta')
   }
};




module.exports = {
   getApiandDb,
   getNames,
   getId,
   createRecipe
}