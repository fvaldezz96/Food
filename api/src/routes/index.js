const { Router } = require('express');
// const axios = require('axios');
const dietsRouter = require('./Diet');
const recetRouter = require('./Recipe');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

/* Diciéndole al enrutador que use el enrutador DietsRouter para todas las rutas que comienzan con
/diets. */
router.use('/diet', dietsRouter);
router.use('/recipe',recetRouter);


module.exports = router;
