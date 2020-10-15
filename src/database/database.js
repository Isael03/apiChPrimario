const {	Sequelize } = require('sequelize');
const config = require('../../config/config');

//MODELS BASE SYSTEM
const usersModel = require('../models/usersModel');
const loginModel = require('../models/loginModel');
const rolModel = require('../models/rolModel');
const usuarioAreaProductivaModel = require('../models/Usuario_AreaProductiva.model');
//MODELS
const componenteModel = require('../models/Transc/componente.model');
const mantencionModel = require('../models/Transc/mantencion.model');
const tipofallaModel = require('../models/Transc/tipo_falla.model');
const categoriaModel = require('../models/Transc/categoria.model');
const fallaModel = require('../models/Transc/falla.model');
const fallaMantencionModel = require('../models/Transc/fallaMantencion.model');
const maquinariaModel = require('../models/Transc/maquinaria.model');
const indicadorModel = require('../models/Transc/indicador.model');
const programaMantencionModel = require('../models/Transc/programaMantencion.model');
const areaProductivaModel = require('../models/Transc/areaProductiva.model');
const eventoModel = require('../models/Transc/evento.model');
const tipoMantencionModel = require('../models/Transc/tipoMantencion.model');
const fallaComponenteModel = require('../models/Transc/fallaComponente.model');
const empresaModel = require('../models/Transc/empresa.model');
const tipoMaquinariaModel = require('../models/Transc/tipoMaquinaria.model');

//Conection DB
const sequelize = new Sequelize(config.dbnametrans, config.username, config.password, {
	dialect: 'mssql',
	host: config.host,
    port: config.port,
	timestamps: false,
	pool: {
		max: 5,
		min: 0,
		acquire: 30000,
		idle: 10000
	}
})
/// TEST CONECTION
// .authenticate()
// .then(function(err) {
//   console.log('Se ha establecido conexión exitosamente.');
// })
// .catch(function (err) {
//   console.log('No se ha podido establecer conexión con la base de datos:', err);
// });

//SET MODELS
const users = usersModel(sequelize, Sequelize);
const login = loginModel(sequelize, Sequelize);
const rol = rolModel(sequelize, Sequelize);
const componente = componenteModel(sequelize, Sequelize);
const mantencion = mantencionModel(sequelize, Sequelize);
const tipoFalla = tipofallaModel(sequelize, Sequelize);
const categoria = categoriaModel(sequelize, Sequelize);
const falla = fallaModel(sequelize, Sequelize);
const fallaMantencion = fallaMantencionModel(sequelize, Sequelize);
const maquinaria = maquinariaModel(sequelize, Sequelize);
const indicador = indicadorModel(sequelize,Sequelize);
const programaMantencion = programaMantencionModel(sequelize,Sequelize);
const areaProductiva = areaProductivaModel(sequelize,Sequelize);
const usuarioAreaProductiva = usuarioAreaProductivaModel(sequelize,Sequelize);
const evento = eventoModel(sequelize,Sequelize);
const tipoMantencion = tipoMantencionModel(sequelize,Sequelize);
const fallaComponente = fallaComponenteModel(sequelize,Sequelize);tipoMaquinariaModel
const empresa = empresaModel(sequelize,Sequelize);
const tipoMaquinaria = tipoMaquinariaModel(sequelize,Sequelize);

//RELATIONS
// componente.hasMany(maquinaria,{ foreignKey:"Id_maquinaria" });
// maquinaria.belongsTo(componente,{ foreignKey:"Id_maquinaria" });
componente.belongsTo(maquinaria,{ foreignKey:"Id_maquinaria" });
maquinaria.hasMany(componente,{ foreignKey:"Id_maquinaria" });

sequelize.sync({
		force: false
	})
	.then(() => {
		console.log("\n**************************************\n tablas sincronizadas en TRANSACCIONAL \n**************************************\n")
	})

module.exports = {
	users,
	login,
	rol,
	areaProductiva,
	usuarioAreaProductiva,

	mantencion,
	fallaMantencion,
	evento,
	componente,
	categoria,
	tipoFalla,
	falla,
	maquinaria,
	indicador,
	programaMantencion,
	tipoMantencion,
	fallaComponente,
	empresa,
	tipoMaquinaria
}