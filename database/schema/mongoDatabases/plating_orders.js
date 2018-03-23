'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const MenuSchema = require('./menu');
const CutlerySchema = require('./cutlery');
// const OrderStatus = require('./const').OrderStatus;
// const DeliveryType = require('./const').DeliveryType;
// const PayMethod = require('./const').PayMethod;
// const OrderType = require('./const').OrderType;
// const DeliveryStatus = require('./const').DeliveryStatus;

//몽고 디비에서 데이터를 긁어온뒤 id를 받아서 그 데이터를 넘겨준다.
const PlatingOrderSchema = new Schema({
  id: {
    type: String,
    unique: true
  },
  userIdx: Number,
  simpleAddress: String,
  roadNameAddress: String,
  address: String,
  name: String,
  phoneNumber: String,
  totalPrice: Number,
  deliveryFee: Number,
  couponIdx: Number,
  couponPrice: Number,
  couponName: String,
  point: Number,
  requestTime: String,
  deliveryTime: String,
  payMethod: String,
  isFirstOrder: Boolean,
  isPacked: Boolean, // DEPRECATED : PACKING SYSTEM
  menus: [MenuSchema],
  dateString: String,
  orderStatus: String,
  deliveryType: String,
  orderType: String,
  serviceType: String,
  riderId: Number,
  previousRiderId: Number,
  deliverySequenceNumber: Number,
  previousDeliverySequenceNumber: Number,
  deliveryStatus: String,
  deliveryCompleteTime: String,
  includeCutlery: Boolean,
  orderChangedCount: Number,
  riderMemo: String,
  latitude: Number,
  longitude: Number,
  area: String,
  authedPhoneNumber: String,
  recipientName: String,
  entrancePassword: String,
  deliveryMemo: String,
  deliveryMethodType: String,
  orderChannelType: String,
  deliveryAt: String,
  serveAt: String,
  cutlerys: [CutlerySchema],
});

//plating order 스키마 정의
var PlatingOrder = mongoose.model('PlatingOrder', PlatingOrderSchema);
function getOrder(order) {
  return new Promise(function (resolve, reject) { // resolve (order)
    PlatingOrder.findOne({
      id: order
    }, function (err, platingOrder) {
      if (err) {
        return reject(err);
      }
      if (platingOrder) {
        return resolve(platingOrder);
      }
    });
  });
};
module.exports = getOrder;
