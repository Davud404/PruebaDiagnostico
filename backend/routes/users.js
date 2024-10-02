var express = require('express');
var router = express.Router();
var rolC = require('../app/controls/RolControl');
let rolControl = new rolC();
var personaC = require('../app/controls/PersonaControl');
let personaControl = new personaC();
var cuentaC = require('../app/controls/CuentaControl');
let cuentaControl = new cuentaC();
var entrenamientoC = require('../app/controls/EntrenamientoControl');
let entrenamientoControl = new entrenamientoC();
var ejercicioC = require('../app/controls/EjercicioControl');
let ejercicioControl = new ejercicioC();
var serieC = require('../app/controls/SerieControl');
let serieControl = new serieC();
var lugarC = require('../app/controls/LugarControl');
let lugarControl = new lugarC();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//inicio de sesión
router.post('/iniciar_sesion',cuentaControl.inicio_sesion);
//api de roles
router.get('/admin/roles',rolControl.listar);
router.post('/admin/roles/guardar', rolControl.guardar);
//api de personas
router.get('/admin/usuarios', personaControl.listar);
router.post('/admin/usuarios/guardar', personaControl.guardar_usuario);
router.patch('/usuario/modificar/:external', personaControl.modificar); //enviar external de usuario
router.post('/admin/personas/guardar', personaControl.guardar);
//api de entrenamiento
router.get('/usuario/entrenamientos/:external',entrenamientoControl.listar_historico);//Enviar external de usuario
router.post('/usuario/entrenamiento/registrar/:external', entrenamientoControl.guardar);//Enviar external de usuario
//api de ejercicio
router.post('/usuario/entrenamiento/:external/registrar/ejercicio', ejercicioControl.guardar); //Enviar external de entrenamiento
router.get('/usuario/entrenamiento/:external/ejercicios', ejercicioControl.listar_por_entrenamiento);//Enviar external de entrenamiento
//api de series
router.post('/usuario/entrenamiento/ejercicio/:external/registrar-serie', serieControl.guardar);//Enviar external del ejercicio

router.get('/lugares',lugarControl.listar);
router.post('/lugares/guardar', lugarControl.guardar);
router.get('/lugar/:tipo_lugar', lugarControl.listar_por_tipo_lugar);

module.exports = router;
