const { Router } = require('express');
const { getApiandDb, getNames, getId, createRecipe, deleteRecipe } = require('../controllers/Recipe.controller');

const router = Router();

router.get('/', getApiandDb);
router.get('/name', getNames);
router.get('/:id', getId);
router.post('/', createRecipe);
// router.delete('/:id', deleteRecipe);
//aca tengo que traer el updateRecipe
module.exports = router;