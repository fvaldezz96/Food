const { Router } = require('express');
const { getAllDiet } = require('../controllers/diet.controllers');

const router = Router();

/* Un controlador de ruta. Es una función que se llamará cuando la ruta coincida. */
router.get('/', getAllDiet);

module.exports = router;
