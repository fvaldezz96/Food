const axios = require('axios');
// const { Op } = require('sequelize/types');
const { Recipe, Diet } = require('../db');

const allRecipes = async () => {

   const typeRecipes = (await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.API_KEY}&addRecipeInformation=true&number=10`)).data.results;
   const mapeoRecipes = typeRecipes.map((e) => ({
      id: e.id,
      name: e.sourceName ? e.sourceName : e.title,
      steps: e.analyzedInstructions[0]?.steps.map(e => ({ number: e.number, step: e.step })),
      summary: e.summary,
      healthScore: e.healthScore,
      diets: e.diets,
      image: e.image
   }))
   return mapeoRecipes;

}

const allDb = async () => {
   try {
      /* Obtener todas las recetas de la base de datos e incluir el nombre de la dietsa. */
      const db = await Recipe.findAll({ include: { model: Diet, attributes: ['name'] } });
      /* Incluido el modelo Dieta y solo el nombre del atributo. */
      const allData = db.map((e) => ({
         id: e.id,
         name: e.name,
         summary: e.summary,
         healthScore: e.healthScore,
         image: e.image,
         diets: e.diets.map(e => e.name),
         /* Asignación de la matriz de dietas a una matriz de nombres. */
         steps: e.steps
      }));
      return allData;
   } catch (error) {
      console.log(error)
   }
}

//en esta funcion haciendo el contac puedo consumir datos de al api y db 
const getApiandDb = async (req, res) => {
   try {
      const allNameRecipe = await allRecipes();
      const allNameDb = await allDb();
      res.send([...allNameRecipe, ...allNameDb]);
   } catch (error) {
      console.log(error)
   }
   // return getApiandDb;
}

//funcio  para encontrar por name la receta 
const getNames = async (req, res) => {
   let name = req.query.name;
   console.log(name,'soy el nombre de la api')
   let all = await allRecipes();
   let db = await allDb();
   let allAndDb = all.concat(db);
   //console.log('llamada a la api',allRecipes)
   try {
      if (name) {
         let searchRecipe = await allAndDb.filter((el) =>
            el.name.toLowerCase().includes(name.toLowerCase())
         );
         searchRecipe.length
            ? res.status(200).send(searchRecipe)
            : res.status(404).send("no encontramos la receta lo siento");
      } else {
         res.status(200).send(allAndDb);
      }
   } catch (error) {
      console.log(error);
   }
};

//funcion para encontrar por id la receta
const getId = async (req, res) => {
   try {
      const { id } = req.params;
      if (id) {
         const idRecipesApi = await allRecipes();
         const dataApi = idRecipesApi.filter((e) => e.id === Number(id));
         // console.log(dataApi,'hola soy io el rangers rojo');
         return res.send(dataApi[0]);
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
      let { name, summary, healthScore, image, steps, diets } = req.body
      if (!name || !summary) return res.send('Faltan datos')
      let newRecipe = await Recipe.create({ name, summary, healthScore, image, steps })
      let dietsPromise = await diets.map(async (e) => await Diet.findOne({ where: { name: e } }))
      let dietsFinal = await Promise.all(dietsPromise)
      newRecipe.addDiets(dietsFinal)

      res.send(newRecipe)

   } catch (error) {
      console.log(error)
      res.send("It haven't created")
   }
};

module.exports = {
   getApiandDb,
   getNames,
   getId,
   createRecipe
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


