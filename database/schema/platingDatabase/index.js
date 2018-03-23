const db = require('../../../src/db/sequelize');
const orderMeta = require('./orderMeta')(db);
const timeSlot = require('./timeSlot')(db);

module.exports = {
  orderMeta,
  timeSlot,
};
