const router = require('express').Router();

//Imports
const middleware = require('./middlewares');
const apiUserRoute = require('./usersRoute');
const loginRoute = require('./loginRoute');
const authRoute = require('./authRoute');
const componentRoute = require('./Transc/componentRoute');
const factRouter = require('./factRoute');
const fallamantencionRoute = require('./Transc/fallaMantencionRoute');
const fallaRoute = require('./Transc/fallaRoute');
const maquinariaRoute = require('./Transc/maquinariaRoute');
const vauthRoute = require('./vauthRoute');
const fallaComponenteRoute = require('./Transc/fallaComponenteRoute');
const fMantencion = require('./Transc/forms/formMantenciones');
const fUsuario = require('./Transc/formUsuarios');
const areaProductiva = require('./Transc/areaProductivaRoute');
const tipoMaquinariaRoute = require('./Transc/tipoMaquinariaRoute');
const categoria = require('./Transc/categoriaRoute');
const tipoFalla = require('./Transc/tipoFallaRoute');
const indicadorRoute = require('./Transc/indicadorRoute');
const eventoRoute = require('./Transc/eventoMantencionRoute');
const tipoMantencionRoute = require('./Transc/tipoMantencionRoute');
const pMantencionRoute = require('./Transc/programaMantencionRoute');

//Routers BASE
router.use('/auth', authRoute);
router.use('/users', middleware.checkToken, apiUserRoute);
router.use('/login',middleware.checkToken, loginRoute);
router.use('/registrarusuario',middleware.checkToken,fUsuario);
router.use('/vauth', middleware.checkToken, vauthRoute);
router.use('/dm',factRouter);

//Routers TRANSC
// router.use('/mantencion',middleware.checkToken,mantencionRoute);
router.use('/components',middleware.checkToken,componentRoute);
router.use('/fallacomponente',middleware.checkToken,fallaComponenteRoute);
router.use('/fallamantencion',middleware.checkToken,fallamantencionRoute);
router.use('/falla',middleware.checkToken,fallaRoute);
router.use('/maquinaria',middleware.checkToken,maquinariaRoute);
router.use('/areaproductiva',middleware.checkToken,areaProductiva);
router.use('/tipomaquinaria',middleware.checkToken,tipoMaquinariaRoute);
router.use('/categoria',middleware.checkToken,categoria);
router.use('/tipofalla',middleware.checkToken,tipoFalla);
router.use('/indicador',middleware.checkToken,indicadorRoute);
router.use('/eventomantencion',middleware.checkToken,eventoRoute);
router.use('/tipomantencion',middleware.checkToken,tipoMantencionRoute);// FALTA
router.use('/pmantencion',middleware.checkToken,pMantencionRoute);// FALTA
//Forms TRANSC
router.use('/fmantencion',middleware.checkToken,fMantencion);


module.exports = router;