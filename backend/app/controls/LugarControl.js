'use strict';
var models = require('../models');
var lugar = models.lugar;

class LugarControl {
    async listar(req, res) {
        var lista = await lugar.findAll({
            attributes: ['nombre', 'longitud', 'latitud', 'tipo_lugar'],
        });
        res.status(200);
        res.json({ msg: "OK", code: 200, datos: lista });
    }

    async listar_por_tipo_lugar(req, res) {
        const tipo = req.params.tipo_lugar;
        var lista = await lugar.findAll({
            attributes: ['nombre', 'longitud', 'latitud', 'tipo_lugar'],
            where: { tipo_lugar: tipo }
        });
        res.status(200);
        res.json({ msg: "OK", code: 200, datos: lista });
    }

    async guardar(req, res) {
        if (req.body.hasOwnProperty('nombre') &&
            req.body.hasOwnProperty('longitud') &&
            req.body.hasOwnProperty('latitud') &&
            req.body.hasOwnProperty('tipo_lugar')) { //Valida de que el atributo "nombre" esté en el body
            var uuid = require('uuid');
            var data = {
                nombre: req.body.nombre,
                longitud: req.body.longitud,
                latitud: req.body.latitud,
                tipo_lugar: req.body.tipo_lugar,
                external_id: uuid.v4()
            }
            var result = await lugar.create(data);
            if (result === null) {
                res.status(401);
                res.json({ msg: "Error", tag: "No se pudo guardar el lugar", code: 401 });
            } else {
                res.status(200);
                res.json({ msg: "OK", tag: "Lugar creado", code: 200 });
            }
        } else {
            res.status(400);
            res.json({ msg: "Error", tag: "Faltan datos", code: 400 });
        }
    }
}

module.exports = LugarControl;