const { Router } = require('express');
const { getApiandDb, getNames, getId, createRecipe } = require('../controllers/Recipe.controller');

const router = Router();

router.get('/', getApiandDb);
router.get('/name', getNames);
router.get('/:id', getId);
router.post('/', createRecipe,);

module.exports = router;