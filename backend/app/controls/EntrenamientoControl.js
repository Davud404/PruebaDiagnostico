'use strict';
var models = require('../models');
var entrenamiento = models.entrenamiento;
var persona = models.persona;

class EntrenamientoControl {
    async listar_historico(req, res) {
        const external = req.params.external;

        try {
            var personaAux = await persona.findOne({ where: { external_id: external } });
            if (personaAux === null || personaAux === undefined) {
                res.status(400);
                res.json({ msg: "Esa persona no existe", code: 400, datos: {} });
            } else {
                var lista = await entrenamiento.findAll({
                    where: { id_persona: personaAux.id },
                    attributes: ['fecha', 'external_id'],
                    include: [
                        { model: models.ejercicio, as: 'ejercicio', attributes: ['nombre'],
                            include:[
                                { model: models.serie, as: 'serie', attributes: ['numero', 'peso', 'repeticiones']}
                            ]
                         },
                    ]
                });
                if (lista === undefined || lista == null) {
                    res.status(200);
                    res.json({ msg: "Esa persona no tiene entrenamientos", code: 200, datos: {} });
                } else {
                    res.status(200);
                    res.json({ msg: "OK", code: 200, datos: lista });
                }
            }
        } catch (error) {
            return res.status(404).json({ msg: "No existe esa persona", code: 404 });
        }

    }

    async guardar(req, res) {
        const external = req.params.external;
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
        }
    }
    //TODO
    async eliminar(req,res){
        const external_persona = req.params.external_persona;
        const external_entrenamiento = req.params.external_entrenamiento;

    }

}

module.exports = EntrenamientoControl;