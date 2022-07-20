const axios = require('axios');
const { Recipe } = require('../db');

const allRecipes = async (req, res) => {
   const typeRecipes = await (axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.API_KEY}&addRecipeInformation=true&number=100`)).data.result;
   const mapeoRecipes = typeRecipes.map((e) => ({
      id: e.id,
      name: e.name,
      step: e.step,
      summary: e.summary,
      healthScore: e.healthScore,
      image: e.image
   }))
}