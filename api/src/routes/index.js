const { Router } = require('express');
// const axios = require('axios');
const dietsRouter = require('./Diet');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

/* Diciéndole al enrutador que use el enrutador DietsRouter para todas las rutas que comienzan con
/diets. */
router.use('/diet', dietsRouter);
// router.use();


module.exports = router;
