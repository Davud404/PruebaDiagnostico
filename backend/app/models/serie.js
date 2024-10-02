'use strict';

module.exports = (sequelize, DataTypes) => {
    const serie = sequelize.define('serie', {
        numero: { type: DataTypes.INTEGER, defaultValue: 0 },
        peso: { type: DataTypes.DOUBLE, defaultValue: 0.0 },
        repeticiones: { type: DataTypes.INTEGER, defaultValue: 0 },
        external_id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4 }
    }, { freezeTableName: true, timestamps: false });

    serie.associate = function(models) {
        serie.belongsTo(models.ejercicio, { foreignKey: 'id_ejercicio', as: 'ejercicio' });
    };

    return serie;
};