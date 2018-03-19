const { DataTypes } = require('sequelize');

module.exports = seq =>
  seq.define(
    'timeSlot',
    {
      id: {
        type: DataTypes.INTEGER(11).UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: 'idx',
      },
      timeSlot: {
        type: DataTypes.STRING(45),
        allowNull: true,
        field: 'time_slot',
      },
      timeStr: {
        type: DataTypes.STRING(5),
        field: 'time_str',
      },
      timeUtc: {
        type: DataTypes.STRING(8),
        field: 'time_utc',
      },

      available: {
        type: DataTypes.INTEGER(1),
        field: 'available',
      },
      serviceType: {
        type: DataTypes.STRING(45),
        field: 'service_type',
      },
    },
    {
      tableName: 'time_slot',
      timestamps: false,
    }
  );
