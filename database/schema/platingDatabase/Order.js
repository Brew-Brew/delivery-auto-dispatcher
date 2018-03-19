const Seq = require('sequelize');
const database = require('../../plating');
const User = require('./User');

const Order = database.define('Order', {
  idx: {
    type: Seq.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userIdx: {
    type: Seq.INTEGER,
    field: 'user_idx',
    model: User,
    key: 'idx',
  },
  addressIdx: { type: Seq.INTEGER, field: 'address_idx' },
  mobile: { type: Seq.STRING },
  totalPrice: { type: Seq.INTEGER, field: 'total_price' },
  deliveryPrice: { type: Seq.INTEGER, field: 'delivery_fee' },
  createdAt: { type: Seq.DATE, field: 'request_time' },
  serveAt: { type: Seq.DATEONLY, field: 'serve_at' },
  deliveryAt: { type: Seq.DATEONLY, field: 'delivery_at' },
}, {
  tableName: 'order_meta',
  timestamps: false,
});

Order.sync();

module.exports = Order;
