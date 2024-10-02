'use strict';
var models = require('../models');
var ejercicio = models.ejercicio;
var entrenamiento = models.entrenamiento;
var persona = models.persona;
var serie = models.serie;

class SerieControl {

    /*async listar_por_entrenamiento(req, res) {
        const external = req.params.external;
        try {
            var entrenamientoAux = await entrenamiento.findOne({ where: { external_id: external } });
            var lista = await ejercicio.findAll({
                where: { id_entrenamiento: entrenamientoAux.id },
                attributes: ['nombre', 'external_id'],
                include: [
                    { model: models.serie, as: 'serie', attributes: ['numero', 'peso', 'repeticiones', 'external_id'] },
                ]
            });
            if (lista === undefined || lista === null) {
                res.status(200);
                res.json({ msg: "No hay ejercicios registrados en este entrenamiento", code: 200, datos: {} });
            } else {
                res.status(200);
                res.json({ msg: "OK", code: 200, datos: lista });
            }
        } catch (error) {
            return res.status(404).json({ msg: "No existe ese entrenamiento", code: 404 });
        }
    }

    async listar_series(req, res) {
        const external = req.params.external;
        try {
            var lista = await serie.findAll({

            })
        } catch (error) {

        }
    }*/

    async guardar(req, res) {
        const external = req.params.external;
        try {
            var ejercicioAux = await ejercicio.findOne({ where: { external_id: external } });
            if (req.body.hasOwnProperty('numero')&&
                req.body.hasOwnProperty('peso') &&
                req.body.hasOwnProperty('repeticiones')) {
                var uuid = require('uuid');
                var data = {
                    numero: req.body.numero,
                    peso: req.body.peso,
                    repeticiones: req.body.repeticiones,
                    external_id: uuid.v4(),
                    id_ejercicio: ejercicioAux.id
                }
                var result = await serie.create(data);
                if (result === null) {
                    res.status(401);
                    res.json({ msg: "Error", tag: "No se pudo guardar la serie", code: 401 });
                } else {
                    res.status(200);
                    res.json({ msg: "OK", tag: "Serie registrada", code: 200 });
                }
            } else {
                res.status(400);
                res.json({ msg: "Error", tag: "Faltan datos", code: 400 });
            }
        } catch (error) {
            res.status(400);
            return res.status(404).json({ msg: "No existe ese ejercicio", code: 404 });
        }
        /*
        try {
            if (req.body.hasOwnProperty('fecha')) {
                var personaAux = await persona.findOne({ where: { external_id: external } });
                if (personaAux === undefined || personaAux === null) {
                    res.status(400);
                    res.json({ msg: "Error", tag: "No existe ese usuario", code: 400 });
                } else {
                    var uuid = require('uuid');
                    var data = {
                        fecha: req.body.fecha,
                        id_persona: personaAux.id,
                        external_id: uuid.v4()
                    }
                    var result = await entrenamiento.create(data);
                    if (result === null) {
                        res.status(401);
                        res.json({ msg: "Error", tag: "No se pudo registrar el entrenamiento", code: 401 });
                    } else {
                        res.status(200);
                        res.json({ msg: "OK", tag: "Entrenamiento registrado", code: 200 });
                    }
                }
            } else {
                res.status(400);
                res.json({ msg: "Error", tag: "Faltan datos", code: 400 });
            }

        } catch (error) {
            return res.status(404).json({ msg: "No existe esa persona", code: 404 });
        }*/
    }


    //TODO
    async eliminar(req, res) {

    }

}

module.exports = SerieControl;